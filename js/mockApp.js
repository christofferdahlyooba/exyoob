"use strict";
var app = angular.module('mockApp', []);

app.config(function($sceProvider) {

	$sceProvider.enabled(false);
	// $sceDelegateProvider.resourceUrlWhitelist([
	// // Allow same origin resource loads.
	// 'self']);
});

var rootFolder = new Folder('Root');
var defaultFileIcon = 'img/file.png';
var defaultFolderIcon = 'img/folder.png';

/* ******************* CONNECT TO DROPBOX ****************************** */
var client = new Dropbox.Client({key: 'ltogrg3uneusbmy'});
client.authenticate(function(error, client) {
	if (error) {
		console.log("Feeeeeel fel fel!")
		//return showError(error);
	}
	else
	{
		console.log("Dropbox account authorized!");
	}
});
/* ********************************************************************** */

app.factory('getFileData', function($q) {
	return {
		getfiledata: function (dir) {
			var deferred = $q.defer();
			var opt = new Object();
			opt.binary = true;
			client.readFile(dir,opt, function (error, data) {
				if (error)
				{
					deferred.reject(error);
				}
				else
				{
					deferred.resolve(data);
				} 
			});
			return deferred.promise;
		}
	}
});

app.factory('getThumb',function($q) {
	return {
		getthumb: function (dir) {
			var deferred = $q.defer();
			var opt = new Object();
			opt.size = "medium";
			client.readThumbnail(dir,opt,function(error,thumb) {
			    if (error) deferred.reject(error);
			    else deferred.resolve(thumb);
			});
			
			return deferred.promise;
		}
	}
});

app.controller('MasterCtrl', function ($scope, $timeout,getFileData,getThumb) {
    /*
    * All settings variables
    */
    $scope.settings = {
        currentFolder: rootFolder,
		rootF: rootFolder,
        nrOfFolders: 0,
        cols: true,
        nrOfCols: 3,
        nrOfRows: 3,
        colStyle: 'col span_1_of_3',
        rowStyleLi: 'rowLi',
		fNameSize: '15em',
        dir: rootFolder.name,
        editing: false,
        mode: 'Edit Mode',
        notAdded: true,
        root: true,
        underMenu0: false,
        underMenu: false,
        underMenu2: false,
        underMenu3: false,
        underMenu4: false, 
        underMenu5: false,
        underMenuViewAccess: false,
        underMenuShareAccess: false,
        underMenuMoveAccess: false,
        underMenuSyncAccess: false,
		inFavFolder: false,
        viewsAllowed: 'Grid & List',
        allAllowed: true,
        gridMode: true,
        showThumb: false,
        showFont: true,
		listPrev: false,
		fontTextInput: false,
		noCheck: true,
        folderIcon: defaultFolderIcon,
        fileIcon: defaultFileIcon,
        bgImage: {'background-image':'url(img/bg.jpg)'},
		bgMini: "img/bg_mini.jpg",
        fontSize: 12,
        fontText: 'Verdana',
        fontColor: 'black',
        font: {'font-size':'12pt','font-family':"Verdana",'color':"black"},
        gridPreview: false,
        height: 600,
        width: 748
    };

    /*
    * Persons in company that can have permissions to files
    * Dummy data
    */
    $scope.persons = [
        {
            name: 'Nisse',
            checked: false,
            noViewAccess: false,
            viewAccess: [],
            shareAccess: [],
            moveAccess: [],
            syncAccess: [],
        },
        {
            name: 'Svenne',
            checked: false,
            noViewAccess: false,
            viewAccess: [],
            shareAccess: [],
            moveAccess: [],
            syncAccess: [],
        },
        {
            name: 'Kalle',
            checked: false,
            noViewAccess: false,
            viewAccess: [],
            shareAccess: [],
            moveAccess: [],
            syncAccess: [],
        },
    ];
        

    /*
    * Enters the selected folder, setting currentFolder and calculating new margins
    */
    $scope.enter = function (folder) {
        $scope.settings.currentFolder = folder;
        $scope.settings.nrOfFolders = getNrOfFolders(folder);
        $scope.settings.dir = folderPathString(getFolderPath($scope.settings.currentFolder));
        $timeout(updateRowMargins);
        $scope.settings.root = false;
		if($scope.settings.showThumb)
		{
			getThumbs($scope.settings.currentFolder);
		}
		if(folder.name === 'Favorites')
		{
			$scope.settings.inFavFolder = true;
		}
    };

    /*
    * Return to parent folder, setting currentFolder and calculating new margins
    */
    $scope.goBack = function () {
        if ($scope.settings.currentFolder.Parent !== null) {
            $scope.settings.currentFolder = $scope.settings.currentFolder.Parent;
            $scope.settings.nrOfFolders = getNrOfFolders($scope.settings.currentFolder);
            $scope.settings.dir = folderPathString(getFolderPath($scope.settings.currentFolder));
            $timeout(updateRowMargins);
            if ($scope.settings.currentFolder.Parent === null) {
                $scope.settings.root = true;
            }
        }
		if($scope.settings.showThumb)
		{
			getThumbs($scope.settings.currentFolder);
		}
		$scope.settings.inFavFolder = false;
    };
	
	$scope.uncheckFolders = function(f)
	{
		if(f.type === 'Folder')
		{
			for(var i=0;i<f.children.length;i++)
			{
				f.children[i].checked = false;
				if(f.type === 'Folder')
				{
					$scope.uncheckFolders(f.children[i]);
				}
			}
		}
		else
		{
			f.checked = false;
		}
	}
	
	$scope.checkFolders = function(f)
	{
		if(f.type === 'Folder')
		{
			for(var i=0;i<f.children.length;i++)
			{
				f.children[i].checked = true;
				if(f.type === 'Folder')
				{
					$scope.checkFolders(f.children[i]);
				}
			}
		}
		else
		{
			f.checked = true;
		}
	}

    /*
    * Returns all folders in this folder
    */
    $scope.getFolders = function (folder) {
        var ret = [];
        for (var i = 0; i < folder.children.length; i++) {
            if (folder.children[i].type === 'Folder') {
                ret.push(folder.children[i]);
            }
        }
        return ret;
    };

    /*
    * Returns all files in this folder
    */
    $scope.getFiles = function (folder) {
        var ret = [];
        for (var i = 0; i < folder.children.length; i++) {
            if (folder.children[i].type !== 'Folder') {
                ret.push(folder.children[i]);
            }
        }
        return ret;
    };

    /*
    * Changes between Grid and List view
    */
    $scope.changeView = function () {
        $scope.settings.gridMode = !$scope.settings.gridMode;
    };

    /*
    * Show a preview in List mode
    */
    $scope.showListPreview = function (f) {
		$scope.settings.listPrev = true;
        // Only process image files.
        if (!f.type.match('image.*')) {
            return;
        }
		console.log(f);

        var canvasFrame = document.getElementById("preview");
        var previewDiv = document.getElementById("previewDiv");
        var divWidth = previewDiv.offsetWidth;
        var divHeight = previewDiv.offsetHeight;
        var ctx = canvasFrame.getContext("2d");

        var img = new Image;
        if (f.origin === "Dropbox") {
        	if (f.data === null) {
        		getFileData.getfiledata(f.path).then(function (data) {
        			f.data = 'data:image/jpeg;base64,' + btoa(data);
        			img.src = f.data;
        		});
        	}
        	else {
        		img.src = f.data;
        	}
        }
		else
		{
			img.src = f.data;
		}
		
        img.onload = function () {
            var ratio;

            if (img.width > img.height) {
                if (img.width > 460) {
                    canvasFrame.width = 460;
                }
                else {
                    canvasFrame.width = img.width;
                }
                ratio = img.height / img.width;
                canvasFrame.height = canvasFrame.width * ratio;
            }
            else if (img.height > img.width) {
                if (img.height > 560) {
                    canvasFrame.height = 560;
                }
                else {
                    canvasFrame.height = img.height;
                }
                ratio = img.width / img.height;
                canvasFrame.width = canvasFrame.height * ratio;
            }
            else {
                if (img.width > 460) {
                    canvasFrame.width = 460;
                }
                else {
                    canvasFrame.width = img.width;
                }
                ratio = img.height / img.width;
                canvasFrame.height = canvasFrame.width * ratio;
            }

            ctx.drawImage(img, 0, 0, canvasFrame.width, canvasFrame.height);
        }
    };

	$scope.readFiles = function(fileName)
	{
		var opt = new Object();
		opt.binary = true;
		client.readFile(fileName,opt, function(error, data) {
		  if (error) {
			return showError(error);  // Something went wrong.
		  }
		});
	};
	
	$scope.thumbs = function (file) {
	    if (file.type.indexOf('image') !== -1) {
	        if (file.thumb === null) {
	            getThumb.getthumb(file.path).then(function (data) {
	                file.thumb = 'data:image/jpeg;base64,' + btoa(data);
	            });
	        }
	    }
	};

    /*
    * Show a preview in Grid mode
    */
    $scope.showGridPreview = function (f) {
        $scope.settings.gridPreview = true;
        // Only process image files.
        if (!f.type.match('image.*')) {
            return;
        }

        var canvasFrame = document.getElementById("previewGrid");
        var previewDiv = document.getElementById("resizable");
        var divWidth = previewDiv.offsetWidth;
        var divHeight = previewDiv.offsetHeight;
        var divLeft = previewDiv.offsetLeft;
        var imgX, imgY;
        var canvasImgW, canvasImgH;

        var ctx = canvasFrame.getContext("2d");
        canvasFrame.width = 700;
        canvasFrame.height = 540;
        var img = new Image;
        if (f.origin === "Dropbox") {
        	if (f.data === null) {
        		getFileData.getfiledata(f.path).then(function (data) {
        			f.data = 'data:image/jpeg;base64,' + btoa(data);
        			img.src = f.data;
        		});
        	}
        	else {
        		img.src = f.data;
        	}
        }
		else
		{
			img.src = f.data;
		}
        
        img.onload = function () {
            var ratio;

            if (img.width > img.height) {
                if (img.width > 700) {
                    canvasImgW = 700;
                }
                else {
                    canvasImgW = img.width;
                }
                ratio = img.height / img.width;
                canvasImgH = canvasImgW * ratio;
            }
            else if (img.height > img.width) {
                if (img.height > 540) {
                    canvasImgH = 540;
                }
                else {
                    canvasImgH = img.height;
                }
                ratio = img.width / img.height;
                canvasImgW = canvasImgH * ratio;
            }
            else {
                if (img.width > 700) {
                    canvasImgW = 700;
                }
                else {
                    canvasImgW = img.width;
                }
                ratio = img.height / img.width;
                canvasImgH = canvasImgW * ratio;
            }
            imgX = (canvasFrame.width - canvasImgW) / 2;
            imgY = (canvasFrame.height - canvasImgH) / 2;
            ctx.drawImage(img, imgX, imgY, canvasImgW, canvasImgH);
        }
    };

    $scope.hasAccess = function (node, name) {
    	return hasAccess(node, name);
    }
	
});


/*
   * Returns all checked folders in current folder
   */
function getCheckedFolders() {
    var scope = angular.element($("#ng")).scope();
    var folders = scope.getFolders(scope.settings.currentFolder);
    var checkedFolders = [];
    for (var i = 0; i < folders.length; i++) {
        if (folders[i].checked) {
            checkedFolders.push(folders[i]);
        }
    }
    return checkedFolders;
};

/*
* Returns all checked files in current folder
*/
function getCheckedFiles() {
    var scope = angular.element($("#ng")).scope();
    var files = scope.getFiles(scope.settings.currentFolder);
    var checkedFiles = [];
    for (var i = 0; i < files.length; i++) {
        if (files[i].checked) {
            checkedFiles.push(files[i]);
        }
    }
    return checkedFiles;
};

/*
* Returns all checked files and folders in current folder
*/
function getCheckedNodes() {
    var scope = angular.element($("#ng")).scope();
    var nodes = [];
    nodes.push.apply(nodes, getCheckedFolders());
    nodes.push.apply(nodes, getCheckedFiles());

    return nodes;
};

/*
* Updates margins between folders in row-Mode
*/
function updateRowMargins() {
    changeRowLiMargins(calcMargins());
};

/*
* Returns number of folders in this folder
*/
function getNrOfFolders(folder) {
    var scope = angular.element($("#ng")).scope();
    return scope.getFolders(folder).length;
};

/*
* Calculates how much margin is needed between folders in row-mode
*/
function calcMargins() {
    var scope = angular.element($("#ng")).scope();
    if (!scope.settings.showFont) {
        return ((scope.settings.height - 84 * scope.settings.nrOfRows) * (1 / scope.settings.nrOfRows)) + 24;
    }
    return (scope.settings.height - 84 * scope.settings.nrOfRows) * (1 / scope.settings.nrOfRows);
};

/*
* Updates the height of css-element rowStyle
*/
function updateHeight(size) {
    var rowStyle = document.getElementById("rowStyle");
    rowStyle.style.height = size + 'px';
    changeRowLiMargins(calcMargins());
};

/*
* Reverses the path and adds an arrow between foldernames
*/
function folderPathString(path) {
    var ret = '';
    for (var i = path.length - 1; i >= 0; i--) {
        if (i !== 0) {
            ret += path[i] + ' -> ';
        } else {
            ret += path[i];
        }
    }
    return ret;
};

/*
* Gets the folder name from this to the root folder
*/
function getFolderPath(folder, path) {
    if (path === undefined) {
        path = [];
    }
    path.push(folder.name);
    if (folder.Parent != null) {
        getFolderPath(folder.Parent, path);
    }
    return path;
};

/*
* Changes margins between each node in row-mode
*/
function changeRowLiMargins(margin) {
    var rowLi = document.getElementsByClassName("rowLi");
    var newMargin = '' + margin + 'px'
    for (var i = 0; i < rowLi.length; i++) {
        rowLi[i].style.marginBottom = newMargin;
    }

};

function getThumbs(curr) {
	var scope = angular.element($("#ng")).scope();
	for (var i = 0; i < curr.children.length; i++) {
		if (curr.children[i].origin === 'Dropbox') {
			scope.thumbs(curr.children[i]);
		}
		else {
			if (curr.children[i].type.indexOf('image') !== -1) {
				curr.children[i].thumb = curr.children[i].data;
			}
		}
	}
};

/*
* Checks of this node is available in the permission list 
* if it is, return true, else false
*/
function hasAccess(node, access) {
	var scope = angular.element($("#ng")).scope();

	for (var i = 0, persons = scope.persons; i < persons.length; i++) {
		//if (persons[i][access].indexOf(node) !== -1) {
		//	return true;
		//}
		for (var j = 0; j<persons[i][access].length; j++)
		if (persons[i][access][j].id === node.id) {
			return true;
		}
	}
	return false;
};
