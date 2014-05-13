"use strict";

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
				var type = file.type.split("/")[0];
				if (type === 'image') {
					file.isImg = true;
				}
				file.img = "img/dbFile.png";
				file.size = f.bytes;
				file.origin = "Dropbox";
				file.path = f.path;
				if($scope.settings.showThumb)
				{
					$scope.thumbs(file);
				}
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
						$scope.settings.nrOfFolders++;
						setTimeout($scope.test2,0,f.contents[i], folder);
					}
					else
					{
						var file = new File(f.contents[i].name, f.contents[i].mime_type);
						var type = file.type.split("/")[0];
						if (type === 'image') {
							file.isImg = true;
						}
						file.img = "img/dbFile.png";
						file.size = f.contents[i].bytes;
						file.origin = "Dropbox";
						file.path = f.contents[i].path;
						if($scope.settings.showThumb)
						{
							$scope.thumbs(file);
						}
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
		$scope.allSelected = false;
		for(var i=0;i<$scope.addCheck.length;i++)
		{
			if($scope.addCheck[i].is_dir)
			{
				var folder = new Folder($scope.addCheck[i].name);
				folder.img = "img/dbFolder.png";
				$scope.settings.currentFolder.add(folder);
				$scope.settings.nrOfFolder++;
				$scope.save.push(folder);
			}
			else
			{
				var folder = $scope.settings.currentFolder;
			}
			$scope.save.push($scope.test2($scope.addCheck[i],folder));
		}
		if($scope.settings.showThumb)
		{
			getThumbs($scope.settings.currentFolder);
		}
		$scope.pathCheck = [];
		$scope.addCheck = [];
		$scope.dir = "";
		$scope.dirArr = [];
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
	
	$scope.closeDB = function()
	{
		$scope.allSelected = false;
		$scope.dir = "";
		$scope.dirArr = [];
	}
	
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
		if($scope.settings.showThumb)
		{
			getThumbs($scope.settings.currentFolder);
		}
	};
	
	/*
    * Starting edit mode and hides big plus icon
    */
	$scope.addFirstFolder = function () {
	    $scope.settings.notAdded = false;
	    $scope.settings.editing = true;
		$scope.addFolders();
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
    * Changes font size
    */
	$scope.applyFontSize = function () {
	    
		if($scope.settings.fontSize > 5 && $scope.settings.fontSize <= 30)
		{
			$scope.settings.font = {
				'font-size': $scope.settings.fontSize + 'pt',
				'font-family': $scope.settings.fontText,
				'color': $scope.settings.fontColor
			}
			$scope.fontTextInput = false;
		}
		else if($scope.settings.fontSize <= 5)
		{
			$scope.settings.fontSize = 6;
			alert("Font size must be at least 6");
		}
		else if($scope.settings.fontSize > 30)
		{
			$scope.settings.fontSize = 30;
			alert("Font size can not be bigger than 30");
		}
	};

    /*
    * Toggles folder icon menu
    */
	$scope.folderIconMenu = function () {
	    $scope.settings.underMenu2 = true;
	};
	
	/*
	*Checks if any folders are checked
	*/
	$scope.folderCheck = function () {
		var folders = $scope.getFolders($scope.settings.currentFolder);
	    for (var i = 0; i < folders.length; i++) {
	        if (folders[i].checked) {
				$scope.settings.noCheck = false;
				return;
	        }
	    }
		$scope.settings.noCheck = true;
		$scope.settings.underMenu2 = false;
	}

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
				$scope.settings.noCheck = false;
	        }
	    }
		if($scope.settings.noCheck)
		{
			alert("No folders checked!")
		}
	};

    /*
    * Toggles file icon menu
    */
	$scope.fileIconMenu = function () {
	    $scope.settings.underMenu5 = true;
	};
	
	
	/*
	*Checks if any files are checked
	*/
	$scope.fileCheck = function () {
		var files = $scope.getFiles($scope.settings.currentFolder);
	    for (var i = 0; i < files.length; i++) {
	        if (files[i].checked) {
				$scope.settings.noCheck = false;
				return;
	        }
	    }
		$scope.settings.noCheck = true;
		$scope.settings.underMenu5 = false;
	}

    /*
    * Changes file icon
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
				$scope.settings.noCheck = false;
	        }
	    }
		if($scope.settings.noCheck)
		{
			alert("No files checked!");
		}
	};
	
	$scope.deselect = function()
	{
		$scope.uncheckFolders($scope.settings.currentFolder);
		var files = $scope.getFiles($scope.settings.currentFolder);
		for(var i = 0; i < files.length; i++)
		{
			files[i].checked = false;
		}
		var folders = $scope.getFolders($scope.settings.currentFolder);
		for(var j = 0; j < folders.length; j++)
		{
			folders[j].checked = false;
		}
		$scope.settings.noCheck = true;
	}

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
			$scope.settings.bgMini = "img/bg_mini.jpg";
	    }
	    else if (i === 2) {
	        $scope.settings.bgImage = { 'background-image': 'url(img/sand.jpg)' };
			$scope.settings.bgMini = "img/bw_sand.jpg";
	    }
	    else if (i === 3) {
	        $scope.settings.bgImage = { 'background-image': 'url(img/sunset.jpg)' };
			$scope.settings.bgMini = "img/bw_sunset.jpg";
	    }
	    else if (i === 4) {
	        $scope.settings.bgImage = { 'background-image': 'url(img/sky.jpg)' };
			$scope.settings.bgMini = "img/bw_sky.jpg";
	    }
		else {
			$scope.settings.bgImage = "";
			$scope.settings.bgMini = "img/bw_none.jpg";
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
		updateFNameSize();
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
		$scope.add();
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
		//Increase font size
	    if (i > 0) {
			if($scope.settings.fontSize < 30)
			{
				$scope.settings.fontSize++;
				$scope.settings.font = { 'font-size': $scope.settings.fontSize + 'pt', 'font-family': $scope.settings.fontText, 'color': $scope.settings.fontColor };
			}
			else
			{
				alert("The font size cannot be bigger than 30");
			}
	    }
		//Decrease font size
	    else {
	        if ($scope.settings.fontSize > 6) {
	            $scope.settings.fontSize--;
	            $scope.settings.font = { 'font-size': $scope.settings.fontSize + 'pt', 'font-family': $scope.settings.fontText, 'color': $scope.settings.fontColor };
	        }
			else
			{
				alert("The font size has to be bigger than 6");
			}
	    }
	};
	
	$scope.testing = function()
	{
		$scope.fontTextInput = true;
	}
	
	$scope.noChecked = function()
	{
		console.log($scope.settings.noCheck)
		if($scope.settings.noCheck)
		{
			alert("You must check a file");
		}
	}

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
		var noCheck = true;
		if(!person.noViewAccess || access === 'viewAccess')
		{
			for (var i = 0, nodes = getCheckedNodes() ; i < nodes.length; i++) {
				var index = person[access].indexOf(nodes[i]);
				if (checked) {
					if (index === -1) {
						$scope.insertAccess(person, nodes[i], access);
						//person[access].push(nodes[i]);
					}
					noCheck = false;
				}
				else {
					if (index !== -1) {
						person[access].splice(index, 1);
					}
				}
			}
			if(noCheck)
			{
				alert("No files/folders are checked!")
			}
		}
		else
		{
			person.checked = false;
			alert("Can´t set this access without having view access");
		}
	    
	};

	$scope.insertAccess = function (person, node, access) {
	    if (node.type === 'Folder') {
	        for (var i = 0; i < node.children.length; i++) {
	            $scope.insertAccess(person, node.children[i], access);
	        }
	    }
	    person[access].push(node);
	}

    /*
    * TODO
    */
	$scope.removeAccess = function (person, node, access, index) {
		if (node.type === 'Folder') {
			if (node.hasChildren) {
				for (var i = 0; i < node.children.length; i++) {
					
				}
			}
		}
	}

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
				if(scope.settings.showThumb)
				{
					file.thumb = file.data;
				}
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

/*------------------------------------------------------------------
--------------------   ADD BG FROM COMPUTER   ----------------------
--------------------------------------------------------------------*/
if(document.getElementById('bgFile') !== null){
	document.getElementById('bgFile').addEventListener('change', handleBGFileSelect, false);
}

function handleBGFileSelect(evt) {
    var file = evt.target.files[0]; // FileList object
	var scope = angular.element($("#ng")).scope();
	
	var reader = new FileReader()
	reader.onload = (function (file) {
		return function (e) {
			file.data = e.target.result;
			scope.settings.bgImage = {'background-image':'url('+file.data+')'}
			scope.settings.bgMini = file.data;
			scope.settings.underMenu = false;
			scope.$apply();
		};
	}(file))
	reader.readAsDataURL(file);
};

/*------------------------------------------------------------------
-----------------ADD FOLDER ICON FROM COMPUTER----------------------
--------------------------------------------------------------------*/
if(document.getElementById('folderIconFile') !== null){
	document.getElementById('folderIconFile').addEventListener('change', handleFoIFileSelect, false);
}

function handleFoIFileSelect(evt) {
    var file = evt.target.files[0]; // FileList object
	var scope = angular.element($("#studio")).scope();
	
	var reader = new FileReader()
	reader.onload = (function (file) {
		return function (e) {
			file.data = e.target.result;
			scope.settings.folderIcon = file.data;
			scope.changeFolderIcon(0);
			scope.settings.underMenu = false;
			scope.$apply();
		};
	}(file))
	reader.readAsDataURL(file);
};

function checkNone()
{
	var scope = angular.element($("#studio")).scope();
	console.log(scope.settings.noCheck)
	return !scope.settings.noCheck
}

/*------------------------------------------------------------------
-----------------ADD FILE ICON FROM COMPUTER------------------------
--------------------------------------------------------------------*/
if(document.getElementById('fileIconImg') !== null){
	document.getElementById('fileIconImg').addEventListener('change', handleFiIFileSelect, false);
}

function handleFiIFileSelect(evt) {
    var file = evt.target.files[0]; // FileList object
	var scope = angular.element($("#studio")).scope();
	
	var reader = new FileReader()
	reader.onload = (function (file) {
		return function (e) {
			file.data = e.target.result;
			scope.settings.fileIcon = file.data;
			scope.changeFileIcon(0);
			scope.settings.underMenu = false;
			scope.$apply();
		};
	}(file))
	reader.readAsDataURL(file);
};



/*----------------------------------------------------------------
------------OTHER NON SCOPE FUNCTIONS-----------------------------
----------------------------------------------------------------*/

function updateFNameSize() {
	var scope = angular.element($("#ng")).scope();
	if(scope.settings.cols)
	{
		var cols = scope.settings.nrOfCols;
		var size = Math.floor(45/cols);
		var fNameSize = document.getElementsByClassName('divfName');
		for(var i=0;i<fNameSize.length;i++)
		{
			fNameSize[i].style.width = size + 'em';
		}
	}
	else
	{
		console.log("heeej heeej!");
	}
}

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
    exportPeopleToJson();
    console.log(JSON.stringify(scope.settings.currentFolder, replacer));
    //return JSON.stringify($scope.currentFolder, replacer);
};

function exportPeopleToJson() {
	var scope = angular.element($("#ng")).scope();
	console.log(JSON.stringify(scope.persons, replacer));
}

/*
* Removes 'Parent' key from JSON to eliminate infinite JSON
* Removes 'data' key to save size
*/
var replacer = function (key, value) {
    if (key === "Parent" || key === 'data') {
        return undefined;
    }
    else return value;
};

/*
* Removes 'currentFolder' key to separate settings and folders
*/
var replacer2 = function (key, value) {
    if (key === "currentFolder" ||key === 'rootF') {
        return undefined;
    }
    else return value;
};
