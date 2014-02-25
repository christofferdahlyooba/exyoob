var app = angular.module('mockApp', []);

app.controller('FirstController', function($scope) {
	$scope.notAdded = true;
	$scope.editing = false;
	$scope.showFont = false;
	$scope.underMenu = false;
	$scope.underMenu2 = false;
	$scope.underMenu3 = false;
	$scope.cols = true;
	$scope.mode = "Edit Layout";
	$scope.nrOfRows = 1;
	$scope.nrOfCols = 3;
	$scope.fontSize = 12;
	$scope.colStyle = "col-md-"+(12/$scope.nrOfCols);
	$scope.fontText = "Verdana";
	$scope.bgImage = {'background-image':'url(img/bg.jpg)'};
	$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText};
	$scope.folderIcon = 'img/folder.png';
	$scope.dir = "Home";
	$scope.root = true;
	
	
	
	$scope.folders = [
      {name:'Folder1',fileType:'Folder',img:$scope.folderIcon}];
	  
	
	$scope.enter = function(folder) {
		$scope.dir = folder;
		if($scope.dir !== "Home")
		{
			$scope.root = false;
		}
	}
	
	$scope.goBack = function() {
		$scope.dir = "Home";
		$scope.root = true;
	}
	  
	$scope.nrOfFolders = $scope.folders.length;
	$scope.edit = function() { 
		$scope.editing = !$scope.editing;
		if($scope.editing){
			$scope.mode = "Save Layout";
		}
		else
		{	
			$scope.mode = "Edit Layout";
		}
	};

	$scope.add = function() {$scope.notAdded=false;}
	
	$scope.bgMenu = function() {$scope.underMenu=true;}
	
	$scope.folderIconMenu = function() {$scope.underMenu2=true;}
	
	$scope.fontMenu = function() {$scope.underMenu3=true;}
	
	$scope.applyFont = function() {
		$scope.underMenu3=false;
		$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText};
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
		$scope.edit();
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
			$scope.colStyle = "col-md-"+(12/$scope.nrOfCols);
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
			$scope.colStyle = "col-md-"+(12/$scope.nrOfCols);
		}
		else
		{
			alert("You must have at least one column");
		}
			
	}
	
	$scope.addNrOfFolders = function() {
		var folder = new Object();
		folder.name = "Folder"+($scope.nrOfFolders+1);
		folder.fileType = "Folder";
		folder.img = $scope.folderIcon;
		$scope.folders.push(folder)
		$scope.nrOfFolders = $scope.folders.length;
	}
	
	$scope.addDBFolder = function(folderName) {
		var folder = new Object();
		folder.name = folderName;
		folder.fileType = "Folder";
		folder.img = "img/dbFolder.png"
		$scope.folders.push(folder)
		$scope.nrOfFolders = $scope.folders.length;
	}
	
	$scope.addDBFile = function(folderName) {
		var folder = new Object();
		folder.name = folderName;
		folder.fileType = "PDF";
		$scope.folders.push(folder)
		$scope.nrOfFolders = $scope.folders.length;
	}
	
	$scope.minusFolder = function() {
		$scope.folders.pop();
		$scope.nrOfFolders = $scope.folders.length;
	}
	
	$scope.addFontSize = function() {
		$scope.fontSize++;
		$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText};
	}
	$scope.minusFontSize = function() {
		if($scope.fontSize > 0)
		{
			$scope.fontSize--;
			$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText};
		}
	}
});