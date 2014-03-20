"use strict";

angular.module('mockApp').controller('FirstController', function($scope, $timeout){
	
    /*
    *
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
    *
    */
	$scope.add = function () {
	    $scope.settings.notAdded = false;
	    $scope.settings.editing = true;
	};

    /*
    *   
    */  
	$scope.viewMenu = function () {
	    $scope.settings.underMenu0 = true;
	};

    /*
    *
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
    *
    */
	$scope.bgMenu = function () {
	    $scope.settings.underMenu = true;
	};

    /*
    *
    */
	$scope.fontMenu = function () {
	    $scope.settings.underMenu3 = true;
	};

    /*
    *
    */
	$scope.fontColorMenu = function () {
	    $scope.settings.underMenu4 = true;
	};

    /*
    *
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
    *
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
    *
    */
	$scope.folderIconMenu = function () {
	    $scope.settings.underMenu2 = true;
	};

    /*
    *
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
    *
    */
	$scope.fileIconMenu = function () {
	    $scope.settings.underMenu5 = true;
	};

    /*
    *
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
    *
    */
	$scope.deleteFolder = function (folder) {
	    $scope.settings.currentFolder.remove(folder);
	    $scope.settings.nrOfFolders = getNrOfFolders($scope.settings.currentFolder);
	};

    /*
    *
    */
	$scope.deleteFile = function (file) {
	    $scope.settings.currentFolder.remove(file);
	};

    /*
    *
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
    *
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
    *
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
    *
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
	};

    /*
    *
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
    *
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
	for (var i = 0, f; f = files[i]; i++) 
	{
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
}



/*----------------------------------------------------------------
------------OTHER NON SCOPE FUNCTIONS-----------------------------
----------------------------------------------------------------*/


/*
*
*/
function togglePlaceHolders(){
	var scope = angular.element($("#ng")).scope();
	var margin = 0;
	if(!scope.settings.showFont){
		margin = 24;
	}
	if(scope.settings.cols){
		var colStyle = document.getElementsByClassName(scope.settings.colStyle);	
		for(var i = 0; i<colStyle.length; i++){
			colStyle[i].style.marginBottom = margin+'px';
		}
	}else{
		var rowLi = document.getElementsByClassName("rowLi");
		for(var i = 0; i<rowLi.length; i++){
			margin = calcMargins();
			rowLi[i].style.marginBottom = margin+'px';
		}		
	}
	scope.$apply();
}

/*
*
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
}

/*
*
*/
function saveNewSize(w, h) {
    var scope = angular.element($("#ng")).scope();
    scope.settings.width = w;
    scope.settings.height = h;
}


/*----------------------------
-----------EXPORT-------------
----------------------------*/
/*
*
*/
function exportSettingsToJson() {
    var scope = angular.element($("#ng")).scope();
    console.log(JSON.stringify(scope.settings, replacer2));
    //return JSON.stringify($scope.currentFolder, replacer);
}

/*
*
*/
function exportToJson() {
    var scope = angular.element($("#ng")).scope();
    exportSettingsToJson();
    console.log(JSON.stringify(scope.settings.currentFolder, replacer));
    //return JSON.stringify($scope.currentFolder, replacer);
}

/*
*
*/
var replacer = function(key, value)
{
  if (key=="Parent" || key ==='data')
  {
      return undefined;
  }
  else return value;
}

/*
*
*/
var replacer2 = function(key, value)
{
  if (key=="currentFolder")
  {
      return undefined;
  }
  else return value;
}
