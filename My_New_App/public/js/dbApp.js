var app = angular.module('dbApp', []);

var testTemp;
app.controller('DBController', function($scope){		
	$scope.dbItems;
	$scope.show = false;
	$scope.dir = ["/"];
	$scope.checked = [];
	$scope.pathCheck = [];
	$scope.checkedFiles = [];
	
	
	var client = new Dropbox.Client({ key: "ltogrg3uneusbmy" });
		
	// client.authDriver(new Dropbox.AuthDriver.Popup({
		// receiverUrl: "https://dl.dropboxusercontent.com/spa/3w77a15hnchp1ya/My_New_App/public/oauth_receiver.html"}));
		
	client.authDriver(new Dropbox.AuthDriver.Redirect({
	rememberUser: true}));

	//client.authDriver(new Dropbox.AuthDriver.NodeServer(8191));

	client.authenticate(function(error, client) {
		if (error) {
		// Replace with a call to your own error-handling code.
		//
		// Don't forget to return from the callback, so you don't execute the code
		// that assumes everything went well.
		console.log("Feeeeeel fel fel!")
		return showError(error);
		}

		// Replace with a call to your own application code.
		//
		// The user authorized your app, and everything went well.
		// client is a Dropbox.Client instance that you can use to make API calls.
		//console.log("Wooorking yao!");
		alert("Dropbox account authorized!");
	});

	//ERROR HANDLING
	var showError = function(error) {
		switch (error.status) {
			case Dropbox.ApiError.INVALID_TOKEN:
				console.log("Something wrong with auth yao!");
				// If you're using dropbox.js, the only cause behind this error is that
				// the user token expired.
				// Get the user through the authentication flow again.
				break;

			case Dropbox.ApiError.NOT_FOUND:
				console.log("File or folder is not in your Dropbox yao!");
			// The file or folder you tried to access is not in the user's Dropbox.
			// Handling this error is specific to your application.
			break;

			case Dropbox.ApiError.OVER_QUOTA:
			// The user is over their Dropbox quota.
			// Tell them their Dropbox is full. Refreshing the page won't help.
				console.log("Your Dropbox is full yao!");
			break;

			case Dropbox.ApiError.RATE_LIMITED:
			// Too many API requests. Tell the user to try again later.
			// Long-term, optimize your code to use fewer API calls.
				console.log("Too much to handle right now yao!");
			break;

			case Dropbox.ApiError.NETWORK_ERROR:
			// An error occurred at the XMLHttpRequest layer.
			// Most likely, the user's network connection is down.
			// API calls will not succeed until the user gets back online.
				console.log("Are you online yao?");
			break;

			case Dropbox.ApiError.INVALID_PARAM:
			case Dropbox.ApiError.OAUTH_ERROR:
			case Dropbox.ApiError.INVALID_METHOD:
			default:
			// Caused by a bug in dropbox.js, in your application, or in Dropbox.
			// Tell the user an error occurred, ask them to refresh the page.
				console.log("Random error occurred yao!");
		}
	};
	
	$scope.sayHello = function()
	{
		client.getAccountInfo(function(error, accountInfo) {
		  if (error) {
			return showError(error);  // Something went wrong.
		  }

		  alert("Har du några filer kvar ens?" + accountInfo.name + "?!");
		});
	};
	
	var dirToString = function()
	{
		var dirStr = "";
		if($scope.dir.length > 1)
		{
			for(var i=0;i<$scope.dir.length;i++)
			{
				dirStr = dirStr+"/"+$scope.dir[i];
			}
			//console.log(dirStr);
			return dirStr;
		}
		else
		{
			return "/";
		}
	};

	var readFiles = function(fileName)
	{
		var opt = new Object();
		opt.binary = true;
		client.readFile("Camera Uploads/"+fileName,opt, function(error, data) {
		  if (error) {
			return showError(error);  // Something went wrong.
		  }
			//console.log("En fil yao!")
			//console.log(data);
			var img = document.createElement('img');
			img.src = 'data:image/jpeg;base64,' + btoa(data);
			document.body.appendChild(img);
		  //alert(data);  // data has the file's contents
		});
	};

	$scope.listDB = function()
	{	
		// var tempArr = [];
		client.readdir(dirToString(), function(error, entries, stat1, stat2) {
			if (error) {
				return showError(error);  // Something went wrong.
			}
		  
			$scope.dbItems = stat2;
			testTemp  = stat1._json;
			//console.log(testTemp);
			(function setFolders(curry)
			{
				//console.log(curry);
				for(var i=0,folder = curry.contents;i<folder.length;i++)
				{
					if(folder[i].is_dir)
					{
						folder[i].name = folder[i].path.replace(/\/([^)]+)\//,"");
						folder[i].name = folder[i].name.replace('/',"");
						//console.log(folder[i].name);
						var inner = $scope.listDBinner(folder[i].path);
						console.log(inner);
						folder[i].contents = inner;
						setFolders(folder[i]);
					}
				}
			})(testTemp);
			//console.log(stat2);
			//console.log(stat1);
		});
		alert("Data läst yao!");
		$scope.show = true;
		$scope.showSome();
	};
	
	
	
	$scope.listDBinner = function(name)
	{	
		//$scope.checked = [];
		$scope.dir.push(name);
		saveChecked();
		
		client.readdir(dirToString(), function(error, entries, stat1, stat2) {
			if (error) {
			return showError(error);  // Something went wrong.
			}
		  
			$scope.dbItems = stat1;
			$scope.show = true;
			//console.log(stat2);
			console.log(stat1._json.contents);
			return(stat1._json.contents);
			
		
		});
		//console.log($scope.checked);
		//console.log($scope.dbItems);
		//return $scope.dbItems._json;
	};
	
	$scope.back = function()
	{
		$scope.checked = [];
		//console.log("Pre"+$scope.dir)
		$scope.dir.splice($scope.dir.length-1,1);
		//console.log("Aft"+$scope.dir);
		$scope.listDB();
		saveChecked();
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
	
	$scope.showSome = function()
	{
		//$scope.show = true;
		//$scope.listDB();
		//console.log("hej");
	};
	
	$scope.updateSelection = function ($event, item) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, item);
    };
	
	var updateSelected = function(action,item)
	{
		if(action === 'add' && $scope.pathCheck.indexOf(item.path) === -1)
		{
			$scope.pathCheck.push(item.path);
		}
		if(action === 'remove' && $scope.pathCheck.indexOf(item.path) !== -1)
		{
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
	
	// $scope.choose = function()
	// {
		
	// }
});

