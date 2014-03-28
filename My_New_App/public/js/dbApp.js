var app = angular.module('dbApp', []);

/* ******************* CONNECT TO DROPBOX ****************************** */
var client = new Dropbox.Client({key: 'ltogrg3uneusbmy'});
client.authenticate(function(error, client) {
	if (error) {
		console.log("Feeeeeel fel fel!")
		//return showError(error);
	}
	else
	{
		alert("Dropbox account authorized!");
	}
});
/* ********************************************************************** */

// var dirToString = function()
// {
	// var dirStr = "";
	// if($scope.dirArr.length > 1)
	// {
		// for(var i=0;i<$scope.dirArr.length;i++)
		// {
			// dirStr = dirStr+"/"+$scope.dirArr[i];
		// }
		// return dirStr;
	// }
	// else
	// {
		// return "/";
	// }
// };

app.factory('getFiles', function($q) {
	return {
		getfiles: function (dir) {
			var deferred = $q.defer();
			
			client.readdir(dir, function (error, entries, stat1, stat2) {
				if (error) deferred.reject(error);
				else deferred.resolve(stat1);
			});
			return deferred.promise;
		}
	}
});

app.factory('getDelta', function($q) {
	return {
		getdelta: function (old) {
			var deferred = $q.defer();
			
			client.delta(old,function (error, changes) {
				if (error) deferred.reject(error);
				else deferred.resolve(changes);
			});
			return deferred.promise;
		}
	}
});

app.controller('DBController', function($scope,getFiles,getDelta){	
	$scope.folder;
	$scope.dir;
	$scope.pathCheck = [];
	$scope.dirArr = [];
	$scope.dbRoot = true;
	getFiles.getfiles('/').then(function (entries) {
		$scope.files = entries;
	});
	
	$scope.sayHello = function()
	{
		client.getAccountInfo(function(error, accountInfo) {
		  if (error) {
			return showError(error);  // Something went wrong.
		  }

		  alert("Har du några filer kvar ens?" + accountInfo.name + "?!");
		});
	};
	
	// $scope.listDB = function()
	// {
		// getFiles.getfiles("/").then(function (stat1) {
			// $scope.folder = stat1._json.contents;
			// for(var i=0;i<$scope.folder.length;i++)
			// {
				// $scope.folder[i].name = $scope.folder[i].path.replace(/\/([^)]+)\//,"");
				// $scope.folder[i].name = $scope.folder[i].name.replace('/',"");
				// if($scope.folder[i].is_dir)
				// {
					// $scope.test2($scope.folder[i]);
				// }
			// }
		// });
	// }
	
	$scope.test2 = function(folder){
		getFiles.getfiles(folder.path).then(function (stat1) {
			folder.contents = stat1._json.contents;
			for(var i=1;i<folder.contents.length;i++)
			{
				folder.contents[i].name = folder.contents[i].path.replace(/\/([^)]+)\//,"");
				folder.contents[i].name = folder.contents[i].name.replace('/',"");
				if(folder.contents[i].is_dir)
				{
					setTimeout($scope.test2(folder.contents[i]));
				}
			}
		});		
	};
	
	$scope.list = function(path)
	{
		if($scope.dirArr.lastIndexOf(path) === -1)
		{
			$scope.dirArr.push(path);
		}
		$scope.dir = $scope.dirArr[$scope.dirArr.length-1];
		$scope.dir = $scope.dir.replace(/\/([^)]+)\//," ");
		$scope.dir = $scope.dir.replace('/'," ");
		getFiles.getfiles(path).then(function (stat1) {
			$scope.dbItems = stat1._json.contents;
			for(var i=0;i<stat1._json.contents.length;i++)
			{
				$scope.dbItems[i].name = $scope.dbItems[i].path.replace(/\/([^)]+)\//,"");
				$scope.dbItems[i].name = $scope.dbItems[i].name.replace('/',"");
				// if($scope.pathCheck.indexOf(path) !== -1)
				// {
					// $scope.pathCheck.push($scope.dbItems[i].path);
				// }
			}
		});
	};
	
	$scope.back = function()
	{
		if($scope.dirArr.length > 1)
		{
			$scope.checked = [];
			$scope.dirArr.pop();
			$scope.dir = $scope.dirArr[$scope.dirArr.length-1];
			$scope.list($scope.dirArr[$scope.dirArr.length-1]);
			saveChecked();
		}
	};

	var saveChecked = function()
	{
		for(var i=0;i<$scope.checked.length;i++)
		{
			if($scope.checked[i] && $scope.pathCheck.indexOf($scope.dbItems[i].path) == -1)
			{
				$scope.pathCheck.push($scope.dbItems[i].path);
				//$scope.checkedFiles.push();
			}
			else
			{
				$scope.pathCheck.pop()
			}
		}
		//console.log($scope.pathCheck);
	};

	$scope.updateSelection = function ($event, item) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, item);
    };

	var updateSelected = function(action,item)
	{
		if(action === 'add')
		{
			if( $scope.pathCheck.indexOf(item.path) === -1)
			{
				$scope.pathCheck.push(item.path);
			}
			getFiles.getfiles(item.path).then(function (stat1) {
				for(var i=0;i<stat1._json.contents.length;i++)
				{
					$scope.pathCheck.push(stat1._json.contents[i].path);
					if(stat1._json.contents[i].is_dir)
					{
						updateSelected('add',stat1._json.contents[i])
					}
				}
			});	
		}
		if(action === 'remove' && $scope.pathCheck.indexOf(item.path) !== -1)
		{
			item.checked = false;
			$scope.pathCheck.splice($scope.pathCheck.indexOf(item.path),1);
		}
		//console.log($scope.pathCheck);
	};

	$scope.isSelected = function (item) {
        return $scope.pathCheck.indexOf(item.path) >= 0;
    };

	$scope.selectAll = function ($event) 
	{
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		//console.log($scope.dbItems);
		for (var i = 0; i < $scope.dbItems.length; i++) {
			var dbItem = $scope.dbItems[i];
			updateSelected(action, dbItem);
		}
    };
});

//ERROR HANDLING
var showError = function(error) {
	switch (error.status) {
		case Dropbox.ApiError.INVALID_TOKEN:
			console.log("Something wrong with auth yao!");
			break;

		case Dropbox.ApiError.NOT_FOUND:
			console.log("File or folder is not in your Dropbox yao!"+error);
		break;

		case Dropbox.ApiError.OVER_QUOTA:
			console.log("Your Dropbox is full yao!");
		break;

		case Dropbox.ApiError.RATE_LIMITED:
			console.log("Too much to handle right now yao!");
		break;

		case Dropbox.ApiError.NETWORK_ERROR:
			console.log("Are you online yao?");
		break;

		case Dropbox.ApiError.INVALID_PARAM:
		case Dropbox.ApiError.OAUTH_ERROR:
		case Dropbox.ApiError.INVALID_METHOD:
		default:
			console.log("Random error occurred yao!");
	}
};



