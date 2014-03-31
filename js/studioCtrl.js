"use strict";

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

angular.module('mockApp').factory('getFiles', function($q) {
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

angular.module('mockApp').controller('FirstController', function($scope,getFiles,$timeout){
	/*****************************************DROPBOX SHIEEEEEET**************************************/
	/************************************************************************************************/
	$scope.folder;
	$scope.dir;
	$scope.pathCheck = [];
	$scope.addCheck = [];
	$scope.dirArr = [];
	$scope.dbRoot = true;
	$scope.save = [];
	getFiles.getfiles('/').then(function (entries) {
		$scope.files = entries;
	});
	
	$scope.test2 = function(f,c){
		getFiles.getfiles(f.path).then(function (stat1) {
			f.contents = stat1._json.contents;
			//Check if f is a file/empty folder or a folder with content
			if(!f.is_dir)
			{
				var file = new File(f.name, f.mime_type);
				file.img = "img/dbFile.png";
				file.size = f.bytes;
				c.add(file);
			}
			else if(f.contents.length > 0)
			{
				for(var i=0;i<f.contents.length;i++)
				{
					f.contents[i].name = f.contents[i].path.replace(/\/([^)]+)\//,"");
					f.contents[i].name = f.contents[i].name.replace('/',"");
					if(f.contents[i].is_dir)
					{
						var folder = new Folder(f.contents[i].name);
						folder.img = "img/dbFolder.png";
						c.add(folder);
						$scope.nrOfFolders++;
						setTimeout($scope.test2(f.contents[i],folder));
					}
					else
					{
						var file = new File(f.contents[i].name, f.contents[i].mime_type);
						file.img = "img/dbFile.png";
						file.size = f.contents[i].bytes;
						c.add(file);
					}
				}
			}
		});
		return f;
	};
	
	$scope.addDB = function()
	{
		$scope.add();
		for(var i=0;i<$scope.addCheck.length;i++)
		{
			if($scope.addCheck[i].is_dir)
			{
				var folder = new Folder($scope.addCheck[i].name);
				folder.img = "img/dbFolder.png";
				$scope.settings.currentFolder.add(folder);
				$scope.nrOfFolder++;
				$scope.save.push(folder);
			}
			else
			{
				var folder = $scope.settings.currentFolder;
			}
			$scope.save.push($scope.test2($scope.addCheck[i],folder));
		}
		$scope.pathCheck = [];
		$scope.addCheck = [];
	};

	$scope.list = function(path)
	{
		if($scope.dirArr.lastIndexOf(path) === -1)
		{
			$scope.dirArr.push(path);
		}
		$scope.dir = $scope.dirArr[$scope.dirArr.length-1];
		$scope.dir = $scope.dir.replace(/\/([^)]+)\//," ");
		$scope.dir = $scope.dir.replace('/'," ");+
		getFiles.getfiles(path).then(function (stat1) {
			$scope.dbItems = stat1._json.contents;
			for(var i=0;i<stat1._json.contents.length;i++)
			{
				$scope.dbItems[i].name = $scope.dbItems[i].path.replace(/\/([^)]+)\//,"");
				$scope.dbItems[i].name = $scope.dbItems[i].name.replace('/',"");
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
		}
		$scope.allSelected = false;
	};
	
	var saveChecked = function()
	{
		for(var i=0;i<$scope.checked.length;i++)
		{
			if($scope.checked[i] && $scope.pathCheck.indexOf($scope.dbItems[i].path) == -1)
			{
				$scope.pathCheck.push($scope.dbItems[i].path);
			}
			else
			{
				$scope.pathCheck.pop()
			}
		}
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
			if( $scope.pathCheck.indexOf(item.path) === -1 && $scope.addCheck.indexOf(item) === -1)
			{
				$scope.pathCheck.push(item.path);
				$scope.addCheck.push(item);
			}
			getFiles.getfiles(item.path).then(function (stat1) {
				if(stat1._json.is_dir)
				{
					updateSelectFolder('add',item);
				}
			});	
		}
		if(action === 'remove')
		{
			if( $scope.pathCheck.indexOf(item.path) !== -1)
			{
				$scope.pathCheck.splice($scope.pathCheck.indexOf(item.path),1);
				$scope.addCheck.splice($scope.addCheck.indexOf(item),1);
			}
			getFiles.getfiles(item.path).then(function (stat1) {
				if(stat1._json.is_dir)
				{
					updateSelectFolder('remove',item);
				}
			});
		}
	};
	
	var updateSelectFolder = function(action,item)
	{
		if(action === 'add')
		{
			getFiles.getfiles(item.path).then(function (stat1) {
				if(stat1._json.is_dir)
				{
					for(var i=0;i<stat1._json.contents.length;i++)
					{
						stat1._json.contents[i].name = stat1._json.contents[i].path.replace(/\/([^)]+)\//,"");
						stat1._json.contents[i].name = stat1._json.contents[i].name.replace('/',"");
						$scope.pathCheck.push(stat1._json.contents[i].path);
						if(stat1._json.contents[i].is_dir)
						{
							updateSelectFolder('add',stat1._json.contents[i]);
						}
					}
				}
			});
		}
		if(action === 'remove')
		{
			getFiles.getfiles(item.path).then(function (stat1) {
				if(stat1._json.is_dir)
				{
					for(var i=0;i<stat1._json.contents.length;i++)
					{
						$scope.pathCheck.splice($scope.pathCheck.indexOf(stat1._json.contents[i].path),1);
						if(stat1._json.contents[i].is_dir)
						{
							updateSelectFolder('remove',stat1._json.contents[i]);
						}
					}
				}
			})
		}
	};
	
	$scope.isSelected = function (item) {
		for(var i=0;i<$scope.pathCheck.length;i++)
		{
			if(item.path === $scope.pathCheck[i])
			{
				return true;
			}
		}
		return false;
    };

	$scope.selectAll = function ($event) 
	{
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		if(action === 'add')
		{
			$scope.allSelected = true;
		}
		else if(action === 'remove')
		{
			$scope.allSelected = false;
		}
		
		for (var i = 0; i < $scope.dbItems.length; i++) {
			console.log($scope.dbItems);
			console.log(action);
			var dbItem = $scope.dbItems[i];
			updateSelected(action, dbItem);
		}
    };
	/************************************************************************************************/
	/************************************************************************************************/
	
	
    /*
    * Changes between edit and view mode
    */
    $scope.editMode = function () {
        $scope.settings.editing = !$scope.settings.editing;
        if ($scope.settings.editing) {
            $scope.settings.mode = "View Mode";
        }
        else {
            $scope.settings.mode = "Edit Mode";
        }
    };

    /*
    * Starting edit mode and hides big plus icon
    */
	$scope.add = function () {
	    $scope.settings.notAdded = false;
	    $scope.settings.editing = true;
	};

    /*
    * Returns true if one submenu is open else false
    */
	$scope.subMenuOpen = function () {
	    return $scope.settings.underMenu0 || $scope.settings.underMenu || $scope.settings.underMenu2
               || $scope.settings.underMenu3 || $scope.settings.underMenu4 || $scope.settings.underMenu5
               || $scope.settings.underMenuViewAccess || $scope.settings.underMenuShareAccess
               || $scope.settings.underMenuMoveAccess || $scope.settings.underMenuSyncAccess;
	};

    /*
    *   Toggle views allowed menu
    */  
	$scope.viewMenu = function () {
	    $scope.settings.underMenu0 = true;
	};

    /*
    * Changes which view mode is allowed, list, grid or both
    */
	$scope.applyViews = function () {
	    $scope.settings.underMenu0 = false;
	    if ($scope.settings.viewsAllowed === 'Grid & List') {
	        $scope.settings.allAllowed = true;
	    }
	    else if ($scope.settings.viewsAllowed === 'Grid') {
	        $scope.settings.allAllowed = false;
	        if (!$scope.settings.gridMode) {
	            $scope.changeView();
	        }
	    }
	    else if ($scope.settings.viewsAllowed === 'List') {
	        $scope.settings.allAllowed = false;
	        if ($scope.settings.gridMode) {
	            $scope.changeView();
	        }
	    }
	};

    /*
    * Toggles background menu
    */
	$scope.bgMenu = function () {
	    $scope.settings.underMenu = true;
	};

    /*
    * Toggles font menu
    */
	$scope.fontMenu = function () {
	    $scope.settings.underMenu3 = true;
	};

    /*
    * Toggles font color menu
    */
	$scope.fontColorMenu = function () {
	    $scope.settings.underMenu4 = true;
	};

    /*
    * Changes font
    */
	$scope.applyFont = function () {
	    $scope.settings.underMenu3 = false;
	    $scope.settings.font = {
	        'font-size': $scope.settings.fontSize + 'pt',
	        'font-family': $scope.settings.fontText,
	        'color': $scope.settings.fontColor
	    };
	};

    /*
    * Changes font color
    */
	$scope.applyFontColor = function () {
	    $scope.settings.underMenu4 = false;
	    $scope.settings.font = {
	        'font-size': $scope.settings.fontSize + 'pt',
	        'font-family': $scope.settings.fontText,
	        'color': $scope.settings.fontColor
	    };
	};

    /*
    * Toggles folder icon menu
    */
	$scope.folderIconMenu = function () {
	    $scope.settings.underMenu2 = true;
	};

    /*
    * Changes folder icon
    */
	$scope.changeFolderIcon = function (i) {
	    $scope.settings.underMenu2 = false;
	    if (i === 1) {
	        $scope.settings.folderIcon = 'img/folder.png';
	    }
	    else if (i === 2) {
	        $scope.settings.folderIcon = 'img/picFolder.png';
	    }
	    else if (i === 3) {
	        $scope.settings.folderIcon = 'img/musicFolder.png';
	    }
	    var folders = $scope.getFolders($scope.settings.currentFolder);
	    for (var j = 0; j < folders.length; j++) {
	        if (folders[j].checked) {
	            folders[j].img = $scope.settings.folderIcon;
	        }
	    }
	};

    /*
    * toggles file icon menu
    */
	$scope.fileIconMenu = function () {
	    $scope.settings.underMenu5 = true;
	};

    /*
    * changes file icon
    */  
	$scope.changeFileIcon = function (i) {
	    $scope.settings.underMenu5 = false;
	    if (i === 1) {
	        $scope.settings.fileIcon = 'img/file.png';
	    }
	    else if (i === 2) {
	        $scope.settings.fileIcon = 'img/picFile.png';
	    }
	    else if (i === 3) {
	        $scope.settings.fileIcon = 'img/pdfFile.jpg';
	    }
	    var files = $scope.getFiles($scope.settings.currentFolder);
	    for (var j = 0; j < files.length; j++) {
	        if (files[j].checked) {
	            files[j].img = $scope.settings.fileIcon;
	        }
	    }
	};

    /*
    * Delete folder and update number of folders
    */
	$scope.deleteFolder = function (folder) {
	    $scope.settings.currentFolder.remove(folder);
	    $scope.settings.nrOfFolders = getNrOfFolders($scope.settings.currentFolder);
	    if (hasPermissionsSet(folder)) {
	        removeNodeFromPermission(folder);
	    }
	};

    /*
    * Delete file
    */
	$scope.deleteFile = function (file) {
	    $scope.settings.currentFolder.remove(file);
	    if (hasPermissionsSet(file)) {
	        removeNodeFromPermission(file);
	    }
	};

    /*
    * Changes background
    */
	$scope.changeBg = function (i) {
	    $scope.settings.underMenu = false;
	    if (i === 1) {
	        $scope.settings.bgImage = { 'background-image': 'url(img/bg.jpg)' };
	    }
	    else if (i === 2) {
	        $scope.settings.bgImage = { 'background-image': 'url(img/sand.jpg)' };
	    }
	    else if (i === 3) {
	        $scope.settings.bgImage = { 'background-image': 'url(img/sunset.jpg)' };
	    }
	    else {
	        $scope.settings.bgImage = { 'background-image': 'url(img/sky.jpg)' };
	    }
	};

    /*
    * Changes number of columns
    */
	$scope.changeCol = function (i) {
	    if (i < 0) {
	        if ($scope.settings.nrOfCols > 1) {
	            $scope.settings.nrOfCols--;
	            $scope.settings.colStyle = "col span_1_of_" + $scope.settings.nrOfCols;
	        }
	    }
	    else {
	        if ($scope.settings.nrOfCols < 12) {
	            $scope.settings.nrOfCols++;
	            $scope.settings.colStyle = "col span_1_of_" + $scope.settings.nrOfCols;
	        }
	    }
	};

    /*
    * Changes number of rows
    */
	$scope.changeRow = function (i) {
	    if (i < 0) {
	        if ($scope.settings.nrOfRows > 1) {
	            $scope.settings.nrOfRows--;
	            changeRowLiMargins(calcMargins());
	        }
	    }
	    else {
	        if ($scope.settings.nrOfRows < 10) {
	            $scope.settings.nrOfRows++;
	            changeRowLiMargins(calcMargins());
	        }
	    }
	};

    /*
    * Adds a folder in the current folder and updates number of folders.
    */
	$scope.addFolders = function () {
	    var folder;
	    if ($scope.settings.currentFolder.Parent === null) {//rootfolder
	        folder = new Folder("Folder" + ($scope.settings.nrOfFolders + 1));
	    }
	    else {
	        folder = new Folder($scope.settings.currentFolder.name + "_" + ($scope.settings.nrOfFolders + 1));
	    }
	    folder.img = $scope.settings.folderIcon;
	    $scope.settings.currentFolder.add(folder);
	    $scope.settings.nrOfFolders = getNrOfFolders($scope.settings.currentFolder);
	    $timeout(updateRowMargins);
	    $timeout(togglePlaceHolders);
	};

    /*
    * Changes font size
    */
	$scope.changeFontSize = function (i) {
	    if (i > 0) {
	        $scope.settings.fontSize++;
	        $scope.settings.font = { 'font-size': $scope.settings.fontSize + 'pt', 'font-family': $scope.settings.fontText, 'color': $scope.settings.fontColor };
	    }
	    else {
	        if ($scope.settings.fontSize > 1) {
	            $scope.settings.fontSize--;
	            $scope.settings.font = { 'font-size': $scope.settings.fontSize + 'pt', 'font-family': $scope.settings.fontText, 'color': $scope.settings.fontColor };
	        }
	    }
	};

    /*
    * Clears the name of a node and focuses the input field
    */
	$scope.clearName = function (index, node) {
	    if (node.type === 'Folder') {
	        document.getElementById("folder-" + index).focus();
	        node.name = '';
	    }
	    else {
	        document.getElementById("file-" + index).focus();
	        node.name = '';
	    }
	};
    
    /*********************************
    ************PERMISSIONS***********
    *********************************/

    /*
    * Opens the view Access submenu and selects the correct users
    */
	$scope.openViewAccessMenu = function () {
	    $scope.settings.underMenuViewAccess = true;

	    for (var i = 0; i < $scope.persons.length; i++) {
	        for (var k = 0; k < getCheckedNodes().length; k++) {
	            if ($scope.persons[i].viewAccess.indexOf(getCheckedNodes()[k]) === -1) {
	                $scope.persons[i].checked = false;
	                break;
	            }
	            else {
	                $scope.persons[i].checked = true;
	            }
	        }
	    }
	};

    /*
    * Opens the share Access submenu and selects the correct users
    */
	$scope.openShareAccessMenu = function () {
	    $scope.settings.underMenuShareAccess = true;

	    for (var i = 0; i < $scope.persons.length; i++) {
	        if (getCheckedNodes().length < 1) {
	            $scope.persons[i].noViewAccess = true;
	            continue;
	        }
	        for (var k = 0; k < getCheckedNodes().length; k++) {
	            if ($scope.persons[i].viewAccess.indexOf(getCheckedNodes()[k]) === -1) {
	                $scope.persons[i].noViewAccess = true;
	                break;
	            }
	            else {
	                $scope.persons[i].noViewAccess = false;
	            }
	        }
	    }

	    for (var i = 0; i < $scope.persons.length; i++) {
	        for (var k = 0; k < getCheckedNodes().length; k++) {
	            if ($scope.persons[i].shareAccess.indexOf(getCheckedNodes()[k]) === -1) {
	                $scope.persons[i].checked = false;
	                break;
	            }
	            else {
	                $scope.persons[i].checked = true;
	            }
	        }
	    }
	};

    /*
    * Opens the move Access submenu and selects the correct users
    */
	$scope.openMoveAccessMenu = function () {
	    $scope.settings.underMenuMoveAccess = true;

	    for (var i = 0; i < $scope.persons.length; i++) {
	        if (getCheckedNodes().length < 1) {
	            $scope.persons[i].noViewAccess = true;
	            continue;
	        }
	        for (var k = 0; k < getCheckedNodes().length; k++) {
	            if ($scope.persons[i].viewAccess.indexOf(getCheckedNodes()[k]) === -1) {
	                $scope.persons[i].noViewAccess = true;
	                break;
	            }
	            else {
	                $scope.persons[i].noViewAccess = false;
	            }
	        }
	    }

	    for (var i = 0; i < $scope.persons.length; i++) {
	        for (var k = 0; k < getCheckedNodes().length; k++) {
	            if ($scope.persons[i].moveAccess.indexOf(getCheckedNodes()[k]) === -1) {
	                $scope.persons[i].checked = false;
	                break;
	            }
	            else {
	                $scope.persons[i].checked = true;
	            }
	        }
	    }
	};
    
    /*
    * Opens the sync Access submenu and selects the correct users
    */
	$scope.openSyncAccessMenu = function () {
	    $scope.settings.underMenuSyncAccess = true;

	    for (var i = 0; i < $scope.persons.length; i++) {
	        if (getCheckedNodes().length < 1) {
	            $scope.persons[i].noViewAccess = true;
	            continue;
	        }
	        for (var k = 0; k < getCheckedNodes().length; k++) {
	            if ($scope.persons[i].viewAccess.indexOf(getCheckedNodes()[k]) === -1) {
	                $scope.persons[i].noViewAccess = true;
	                break;
	            }
	            else {
	                $scope.persons[i].noViewAccess = false;
	            }
	        }
	    }

	    for (var i = 0; i < $scope.persons.length; i++) {
	        for (var k = 0; k < getCheckedNodes().length; k++) {
	            if ($scope.persons[i].syncAccess.indexOf(getCheckedNodes()[k]) === -1) {
	                $scope.persons[i].checked = false;
	                break;
	            }
	            else {
	                $scope.persons[i].checked = true;
	            }
	        }
	    }
	};

    /*
    * Adds all selected files to the selected person and the choosen access (view, share, move or sync)
    */
	$scope.addAccess = function (evt, access) {

	    var checked = evt['event'].checked;
	    var person = evt['event'].person;

	    for (var i = 0, nodes = getCheckedNodes() ; i < nodes.length; i++) {
	        var index = person[access].indexOf(nodes[i]);
	        if (checked) {
	            if (index === -1) {
	                person[access].push(nodes[i]);
	            }
	        }
	        else {
	            if (index !== -1) {
	                person[access].splice(index, 1);
	            }
	        }
	    }
	};

    /*
    * Closes all permissions submenu and deselects all users
    */
	$scope.exitAccessMenu = function () {
	    $scope.settings.underMenuViewAccess = false;
	    $scope.settings.underMenuShareAccess = false;
	    $scope.settings.underMenuMoveAccess = false;
	    $scope.settings.underMenuSyncAccess = false;

	    for (var i = 0; i < $scope.persons.length; i++) {
	        $scope.persons[i].checked = false;
	    }
	};

});



/*------------------------------------------------------------------
--------------------DRAG AND DROP-----------------------------------
--------------------------------------------------------------------*/
var fileDiv = document.getElementById("dnd");
if(fileDiv !== null){
	fileDiv.addEventListener("dragenter", function (e) {
		e.stopPropagation();
		e.preventDefault();
	}, false);

	fileDiv.addEventListener("dragover", function (e) {
		e.stopPropagation();
		e.preventDefault();
	}, false);

	fileDiv.addEventListener("drop", function (e) {
		e.stopPropagation();
		e.preventDefault();

		var dt = e.dataTransfer;
		var files = dt.files;

		var scope = angular.element($("#ng")).scope();
		for (var i = 0, f; f = files[i]; i++) {
			var file = new File(f.name, f.type);
			file.img = scope.settings.fileIcon;
			file.size = f.size;
			file.lastModified = f.lastModifiedDate;
			var type = f.type.split("/")[0];
			if(type === 'image'){
				file.isImg = true;
			}
			var reader = new FileReader()
			reader.onload = (function(file){
			  return function(e){			
				file.data = e.target.result;
				scope.$apply();
			  };
			}(file))
			reader.readAsDataURL(f);
			
			scope.$apply(function () {			
				scope.settings.currentFolder.add(file);
			});
		}
		setTimeout(updateRowMargins);
		setTimeout(togglePlaceHolders);
	}, false);
}
/*------------------------------------------------------------------
--------------------ADD FILES FROM COMPUTER-------------------------
--------------------------------------------------------------------*/
if(document.getElementById('files') !== null){
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    $('#addFiles').modal('hide');

    var scope = angular.element($("#ng")).scope();
    for (var i = 0, f; f = files[i]; i++) {
        var file = new File(f.name, f.type);
        file.img = scope.settings.fileIcon;
        file.size = f.size;
        file.lastModified = f.lastModifiedDate;
        var type = f.type.split("/")[0];
        if (type === 'image') {
            file.isImg = true;
        }
        var reader = new FileReader()
        reader.onload = (function (file) {
            return function (e) {
                file.data = e.target.result;
                scope.$apply();
            };
        }(file))
        reader.readAsDataURL(f);

        scope.$apply(function () {
            scope.settings.currentFolder.add(file);
        });
    }
    setTimeout(updateRowMargins);
    setTimeout(togglePlaceHolders);
};



/*----------------------------------------------------------------
------------OTHER NON SCOPE FUNCTIONS-----------------------------
----------------------------------------------------------------*/

/*
* Adds margin at the bottom of each node so that they dont jump when 
* toggeling showFolderName
*/
function togglePlaceHolders() {
    var scope = angular.element($("#ng")).scope();
    var margin = 0;
    if (!scope.settings.showFont) {
        margin = 24;
    }
    if (scope.settings.cols) {
        var colStyle = document.getElementsByClassName(scope.settings.colStyle);
        for (var i = 0; i < colStyle.length; i++) {
            colStyle[i].style.marginBottom = margin + 'px';
        }
    } else {
        var rowLi = document.getElementsByClassName("rowLi");
        for (var i = 0; i < rowLi.length; i++) {
            margin = calcMargins();
            rowLi[i].style.marginBottom = margin + 'px';
        }
    }
    scope.$apply();
};

/*
* Changes scrollbar visibility depending on scroll direction TODO-Change name
*/
function changeScrollDir(cols) {
    var contentPanel = document.getElementsByClassName("contentpanel2");
    if (cols) {
        contentPanel[1].style.overflowY = 'auto';
        contentPanel[1].style.overflowX = 'hidden';
    } else {
        contentPanel[1].style.overflowX = 'auto';
        contentPanel[1].style.overflowY = 'hidden';
    }
};

/*
* Sets scope width and height
*/
function saveNewSize(w, h) {
    var scope = angular.element($("#ng")).scope();
    scope.settings.width = w;
    scope.settings.height = h;
};

/*
* Returns true if this node has a permission set, else returns false
*/
function hasPermissionsSet(node) {
    return hasAccess(node, 'viewAccess') ||
        hasAccess(node, 'shareAccess') ||
        hasAccess(node, 'moveAccess') ||
        hasAccess(node, 'syncAccess');
};

/*
* Checks of this node is available in the permission list 
* if it is, return true, else false
*/
function hasAccess(node, access) {
    var scope = angular.element($("#ng")).scope();

    for (var i = 0, persons = scope.persons; i < persons.length; i++) {
        if (persons[i][access].indexOf(node) !== -1) {
            return true;
        }
    }
    return false;
};

/*
* Removes a file from all permission lists it is currently in
*/
function removeNodeFromPermission(node) {
    var scope = angular.element($("#ng")).scope();

    for (var i = 0, persons = scope.persons; i < persons.length; i++) {
        var index = persons[i].viewAccess.indexOf(node);
        if (index !== -1) {
            persons[i].viewAccess.splice(index, 1);
        }

        index = persons[i].shareAccess.indexOf(node);
        if (index !== -1) {
            persons[i].shareAccess.splice(index, 1);
        }

        index = persons[i].moveAccess.indexOf(node);
        if (index !== -1) {
            persons[i].moveAccess.splice(index, 1);
        }

        index = persons[i].syncAccess.indexOf(node);
        if (index !== -1) {
            persons[i].syncAccess.splice(index, 1);
        }
    }
};

/*----------------------------
-----------EXPORT-------------
----------------------------*/
/*
* Export the settings to JSON
*/
function exportSettingsToJson() {
    var scope = angular.element($("#ng")).scope();
    console.log(JSON.stringify(scope.settings, replacer2));
    //return JSON.stringify($scope.currentFolder, replacer);
};

/*
* Export the current files and folders to JSON
*/
function exportToJson() {
    var scope = angular.element($("#ng")).scope();
    exportSettingsToJson();
    console.log(JSON.stringify(scope.settings.currentFolder, replacer));
    //return JSON.stringify($scope.currentFolder, replacer);
};

/*
* Removes 'Parent' key from JSON to eliminate infinite JSON
* Removes 'data' key to save size
*/
var replacer = function (key, value) {
    if (key == "Parent" || key === 'data') {
        return undefined;
    }
    else return value;
};

/*
* Removes 'currentFolder' key to separate settings and folders
*/
var replacer2 = function (key, value) {
    if (key == "currentFolder") {
        return undefined;
    }
    else return value;
};
