
var app = angular.module('mockApp', []);
var fileIcion = "img/file.png"

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
	$scope.underMenu5 = false;
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
	
	
	//Set root folder to the current folder
	$scope.rootFolder = {name:'Home',fileType:'Folder',img:$scope.folderIcon,checked:false,folderList:null,fileList: null,parentFolder:null};
	$scope.currentFolder = $scope.rootFolder;
	$scope.nrOfFolders = folders.length;
	
	
	//Enter a folder
	$scope.enter = function(folder) {
		//Clear earlier folders and reset nrOfFolders
		folders = [];
		$scope.nrOfFolders = 0;
		$scope.dir = folder.name;
		//Set the currentFolder to be the entered folder
		$scope.currentFolder = folder;
		//console.log($scope.currentFolder.fileList);
		if($scope.currentFolder.fileList !== null)
		{
			showThumbnail($scope.currentFolder.fileList);
		}
		//console.log($scope.currentFolder);
		//console.log($scope.rootFolder);
		if($scope.dir !== "Home")
		{
			$scope.root = false;
		}
		console.log("Entered: ");
		console.log($scope.currentFolder);
	};
	
	
	$scope.goBack = function() {
		folders = $scope.currentFolder.folderList;
		$scope.nrOfFolders = folders.length;
		if($scope.currentFolder.name !== 'Home')
		{
			$scope.currentFolder = $scope.currentFolder.parentFolder;
			$scope.dir = $scope.currentFolder.name;
		}
		else
		{
			$scope.currentFolder = $scope.rootFolder;
		}
		console.log("Went back to: ");
		console.log($scope.currentFolder);
		// if($scope.currentFolder.fileList !== null)
		// {
			// showThumbnail($scope.currentFolder.filesList);
		// }
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

	//Add files or folders to the current folder
	$scope.add = function() {
		$scope.notAdded=false; 
		$scope.editing = true;
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
	
	$scope.folderIconMenu = function() {$scope.underMenu2=true;}
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
		
		for(var j=0;j<folders.length;j++)
		{
			if(folders[j].checked)
			{
				folders[j].img = $scope.folderIcon;
			}	
		}
	};
	
	$scope.fileIconMenu = function() {$scope.underMenu5=true;}
	$scope.changeFileIcon = function(i) {
		$scope.underMenu5=false;
		if(i === 1)
		{
			fileIcon = 'img/file.png';
		}
		else if(i === 2)
		{
			fileIcon = 'img/picFile.png';
		}
		else if(i === 3)
		{
			fileIcon = 'img/pdfFile.jpg';
		}
		
		for(var j=0;j<$scope.currentFolder.fileList.length;j++)
		{
			if($scope.currentFolder.fileList[j].checked)
			{
				console.log("Nåt är checkat yao!");
				$scope.currentFolder.fileList[j].img = fileIcon;
				console.log(fileIcon);
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
	$scope.addFolders = function() {
		var folder = new Object();
		//Adds  _1, _2, _3 etc to the folder name if it's a subfolder
		if($scope.currentFolder.name === 'Home')
		{
			folder.name = "Folder"+($scope.nrOfFolders+1);
		}
		else
		{
			folder.name = $scope.currentFolder.name+"_"+($scope.nrOfFolders+1);
		}
		
		//Set all the attributes to the new folder
		folder.fileType = "Folder";
		folder.img = $scope.folderIcon;
		folder.checked = false;
		folder.folderList = null;
		folder.fileList = null;
		//Set the current folder to be the parent folder of the new folder
		folder.parentFolder = $scope.currentFolder;
		//Adds the new folder to the folders array
		folders.push(folder);
		//Updates the number of folders
		$scope.nrOfFolders = folders.length;
		//Updates the folderList of the currentFolder
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
		folders.push(folder)
		$scope.nrOfFolders = folders.length;
		$scope.currentFolder.folderList = folders;
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
});
		fileIcon = "img/file.png";
		document.getElementById('files').addEventListener('change', handleFileSelect, false);
		
		
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
		  
			var scope = angular.element($("#ng")).scope();
			scope.$apply(function(){
				scope.currentFolder.fileList = fileArr;
			});

			showThumbnail(fileArr);
		},false);
		// -----------------------------------------------------------------
		
		function handleFileSelect(evt) {
			var files = evt.target.files; // FileList object
			$('#addFiles').modal('hide');
			//console.log(files);
			
			var fileArr = new Array();
			for (var i = 0, f; f = files[i]; i++) 
			{
				f.checked = false;
				f.img = fileIcon;
				fileArr.push(f);
			}
			//console.log(fileArr);
			
			var scope = angular.element($("#ng")).scope();
			scope.$apply(function(){
				if(scope.currentFolder.fileList === null)
				{
					scope.currentFolder.fileList = fileArr;
				}
				else
				{
					console.log("merging yao!")
					scope.currentFolder.fileList = scope.currentFolder.fileList.concat(fileArr);
				}
				console.log(scope.currentFolder.fileList);
			});
			showThumbnail();
		}
		
		function showThumbnail()
		{
			var files = null;
			var scope = angular.element($("#ng")).scope();
			scope.$apply(function(){
				files = scope.currentFolder.fileList
				
			})
			console.log(files);
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
		
		