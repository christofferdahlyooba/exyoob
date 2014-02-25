var app = angular.module('mockApp', [])

app.controller('FirstController', function($scope) {
	$scope.notAdded = true;
	$scope.editing = false;
	$scope.showFont = false;
	$scope.showThumb = false;
	$scope.underMenu0 = false;
	$scope.underMenu = false;
	$scope.underMenu2 = false;
	$scope.underMenu3 = false;
	$scope.underMenu4 = false;
	$scope.cols = true;
	$scope.gridMode = true;
	$scope.viewsAllowed = "Grid & List";
	$scope.allAllowed = true;
	$scope.mode = "Edit Mode";
	$scope.nrOfRows = 1;
	$scope.nrOfCols = 3;
	$scope.fontSize = 12;
	$scope.colStyle = "col span_1_of_"+$scope.nrOfCols;
	$scope.fontText = "Verdana";
	$scope.fontColor = "black";
	$scope.bgImage = {'background-image':'url(img/bg.jpg)'};
	$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText,'color':$scope.fontColor};
	$scope.folderIcon = 'img/folder.png';
	$scope.dir = "Home";
	$scope.root = true;
	$scope.fileList;
	var folders = [];
	
	
	$scope.folders = [];
	//Set root folder to the current folder
	//$scope.currentFolder = $scope.folders[0];
	$scope.rootFolder = {name:'Home',fileType:'Folder',img:$scope.folderIcon,checked:false,folderList:null,fileList: null,parentFolder:null};
	$scope.currentFolder = $scope.rootFolder;
	$scope.nrOfFolders = $scope.folders.length;
	
	
	//Enter a folder
	$scope.enter = function(folder) {
		folders = [];
		$scope.nrOfFolders = 0;
		$scope.dir = folder.name;
		$scope.currentFolder = folder;
		console.log($scope.currentFolder);
		console.log($scope.rootFolder);
		if($scope.dir !== "Home")
		{
			$scope.root = false;
		}
		if($scope.currentFolder.fileList !== null)
		{
			$scope.showThumbnail();
		}
		
	};
	
	
	$scope.goBack = function() {
		if($scope.currentFolder.name !== 'Home')
		{
			$scope.currentFolder = $scope.currentFolder.parentFolder;
			$scope.dir = $scope.currentFolder.name;
		}
		if($scope.currentFolder.fileList !== null)
		{
			$scope.showThumbnail();
		}
	};
	
	
	//Go between edit mode and view mode
	$scope.editMode = function() { 
		console.log($scope.rootFolder);
		$scope.editing = !$scope.editing;
		if($scope.editing){
			$scope.mode = "View Mode";
		}
		else
		{	
			$scope.mode = "Edit Mode";
		}
		//$scope.add();
	};

	//Add files to the current folder
	$scope.add = function() {
		$scope.notAdded=false; 
		$scope.editing = true;
		var fileList = new Array(); 
		fileList = $scope.fileList;
		$scope.currentFolder.fileList = fileList; 
		console.log($scope.currentFolder.fileList);
	} 
	
	$scope.viewMenu = function() {$scope.underMenu0=true;}
	
	$scope.applyViews = function() {
		$scope.underMenu0=false;
		if($scope.viewsAllowed === 'Grid & List')
		{
			$scope.allAllowed = true;
		}
		else if($scope.viewsAllowed === 'Grid')
		{
			$scope.allAllowed = false;
			if(!$scope.gridMode)
			{
				$scope.changeView();
			}
		}
		else if($scope.viewsAllowed === 'List')
		{
			$scope.allAllowed = false;
			if($scope.gridMode)
			{
				$scope.changeView();
			}
		}
		
	}
	
	$scope.changeView = function()
	{
		$scope.gridMode = !$scope.gridMode;
	}
	
	$scope.bgMenu = function() {$scope.underMenu=true;}
	
	$scope.folderIconMenu = function() {$scope.underMenu2=true;}
	
	$scope.fontMenu = function() {$scope.underMenu3=true;}
	
	$scope.fontColorMenu = function() {$scope.underMenu4=true;}
	
	$scope.applyFont = function() {
		$scope.underMenu3=false;
		$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText,'color':$scope.fontColor};
	}
	
	$scope.applyFontColor = function() {
		$scope.underMenu4=false;
		$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText,'color':$scope.fontColor};
	}
	
	$scope.changeFolderIcon = function(i) {
		$scope.underMenu2=false;
		if(i === 1)
		{
			$scope.folderIcon = 'img/folder.png';
		}
		else if(i === 2)
		{
			$scope.folderIcon = 'img/picFolder.png';
		}
		else if(i === 3)
		{
			$scope.folderIcon = 'img/musicFolder.png';
		}
		
		for(var j=0;j<$scope.folders.length;j++)
		{
			if($scope.folders[j].checked)
			{
				$scope.folders[j].img = $scope.folderIcon;
			}	
		}
	};
	
	$scope.deleteFolder = function(i)
	{
		$scope.currentFolder.folderList.splice(i,1);
	};
	
	$scope.deleteFile = function(i)
	{
		$scope.currentFolder.fileList.splice(i,1);
	};
	
	$scope.changeBg = function(i) {
		$scope.underMenu=false;
		if(i === 1)
		{
			$scope.bgImage = {'background-image':'url(img/bg.jpg)'};
		}
		else if(i === 2)
		{
			$scope.bgImage = {'background-image':'url(img/sand.jpg)'};
		}
		else if(i === 3)
		{
			$scope.bgImage = {'background-image':'url(img/sunset.jpg)'};
		}
		else
		{
			$scope.bgImage = {'background-image':'url(img/sky.jpg)'};
		}
	};
	
	
	$scope.addFolder = function() {
		$scope.add();
	}
	$scope.addRow = function() {
		$scope.nrOfRows++;
	}
	
	$scope.minusRow = function() {
		if($scope.nrOfRows > 0)
		{
			$scope.nrOfRows--;
		}
	}
	
	$scope.addCol = function() {
		if($scope.nrOfCols<12)
		{
			$scope.nrOfCols++;
			$scope.colStyle = "col span_1_of_"+$scope.nrOfCols;
		}
		else
		{
			alert("You can't have more than 12 columns");
		}
	}
	
	$scope.minusCol = function() {
		if($scope.nrOfCols > 1)
		{
			$scope.nrOfCols--;
			$scope.colStyle = "col span_1_of_"+$scope.nrOfCols;
		}
		else
		{
			alert("You must have at least one column");
		}
			
	}
	
	
	//Add a new folder
	$scope.addNrOfFolders = function() {
		var folder = new Object();
		folder.name = "Folder"+($scope.nrOfFolders+1);
		folder.fileType = "Folder";
		folder.img = $scope.folderIcon;
		folder.checked = false;
		folder.folderList = null;
		folder.fileList = null;
		folder.parentFolder = $scope.currentFolder;
		//$scope.folders.push(folder); 
		folders.push(folder);
		$scope.nrOfFolders = folders.length;
		//$scope.currentFolder.folderList = $scope.folders;
		$scope.currentFolder.folderList = folders;
	}
	
	$scope.addDBFolder = function(folderName) {
		var folder = new Object();
		folder.name = folderName;
		folder.fileType = "DBFolder";
		folder.img = "img/dbFolder.png";
		folder.checked = false;
		folder.folderList = null;
		folder.fileList = null;
		$scope.folders.push(folder)
		$scope.nrOfFolders = $scope.folders.length;
		$scope.currentFolder.folderList = $scope.folders;
	}
	
	$scope.addDBFile = function(folderName) {
		var folder = new Object();
		folder.name = folderName;
		folder.fileType = "PDF";
		$scope.folders.push(folder)
		$scope.nrOfFolders = $scope.folders.length;
	}
	
	$scope.minusFolder = function() {
		folders.pop();
		$scope.nrOfFolders = folders.length;
	}
	
	$scope.addFontSize = function() {
		$scope.fontSize++;
		$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText,'color':$scope.fontColor};
	}
	$scope.minusFontSize = function() {
		if($scope.fontSize > 0)
		{
			$scope.fontSize--;
			$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText,'color':$scope.fontColor};
		}
	}
		
	$scope.clearName = function(index)
	{
		document.getElementById("folder-"+index).focus();
	}
	
	
	
	$scope.showListPreview = function(f)
	{
		// Only process image files.
		// if (!f.type.match('image.*')) {
			// continue;
		// }
		
		var image = document.createElement("img");
		//var id = "thumb-"+i;
		// image.classList.add("")
		var preview = document.getElementById("preview");
		image.file = f;
		preview.replaceChild(image,preview.childNodes[0]);
		//preview.appendChild(image)

		var reader = new FileReader()
		reader.onload = (function(aImg){
		  return function(e){
			aImg.src = e.target.result;
		  };
		}(image))
		var ret = reader.readAsDataURL(f);
		var canvas = document.createElement("canvas");
		ctx = canvas.getContext("2d");
		image.onload= function(){
			ctx.drawImage(image,100,100)
		}
	}
	
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
	
	// ------------------- Make plus button droppable ----------------------
		var fileDiv = document.getElementById("dnd");
		fileDiv.addEventListener("dragenter",function(e){
			e.stopPropagation();
			e.preventDefault();
		},false);

		fileDiv.addEventListener("dragover",function(e){
			e.stopPropagation();
			e.preventDefault();
		},false);

		fileDiv.addEventListener("drop",function(e)
		{
			e.stopPropagation();
			e.preventDefault();

			var dt = e.dataTransfer;
			var files = dt.files;

			var fileArr = new Array();
			  
			for (var i = 0, f; f = files[i]; i++) 
			{	
					fileArr.push(f);
			}
		  
			// var scope = angular.element($("#ng")).scope();
			// scope.$apply(function(){
				// scope.currentFolder.fileList = fileArr;
			// });
			$scope.currentFolder.fileList = filerArr;

			//showThumbnail(fileArr);
			 $scope.showThumbnail();
		},false);
		// -----------------------------------------------------------------
		
		function handleFileSelect(evt) {
			var files = evt.target.files; // FileList object
			$('#addFiles').modal('hide');
			console.log(files);
			
			var fileArr = new Array();
			
			for (var i = 0, f; f = files[i]; i++) 
			{
				
				fileArr.push(f);
			}
			//console.log(fileArr);
			
			// var scope = angular.element($("#ng")).scope();
			// scope.$apply(function(){
				// scope.currentFolder.fileList = fileArr;
			// });
			$scope.currentFolder.fileList = fileArr;
			
			//showThumbnail(fileArr);
			$scope.showThumbnail();
		}
		
		$scope.showThumbnail = function()
		{
			var files = $scope.currentFolder.fileList;
			for (var i = 0, f; f = files[i]; i++) 
			{
				// Only process image files.
				if (!f.type.match('image.*')) {
					continue;
				}
				
				var image = document.createElement("img");
				var id = "thumb-"+i;
				// image.classList.add("")
				var thumbnail = document.getElementById(id);
				console.log(thumbnail);
				image.file = f;
				thumbnail.appendChild(image)

				var reader = new FileReader()
				reader.onload = (function(aImg){
				  return function(e){
					aImg.src = e.target.result;
				  };
				}(image))
				var ret = reader.readAsDataURL(f);
				var canvas = document.createElement("canvas");
				ctx = canvas.getContext("2d");
				  image.onload= function(){
				  ctx.drawImage(image,100,100)
				}
			}
		}
});