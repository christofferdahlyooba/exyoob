var app = angular.module('mockApp', []);

app.controller('FirstController', function($scope){
	
	var defaultFileIcon = 'img/file.png';
	var defaultFolderIcon = 'img/folder.png';	
	var rootFolder = new Folder('Root', 'Folder');
	rootFolder.img = defaultFolderIcon;
	
	$scope.currentFolder = rootFolder;
	$scope.nrOfFolders = 0;
	$scope.currDirName = rootFolder.name;
	$scope.editing = false;
	$scope.mode = "Edit Mode";
	$scope.notAdded=true;
	$scope.underMenu0 = false;
	$scope.underMenu = false;
	$scope.underMenu2 = false;
	$scope.underMenu3 = false;
	$scope.underMenu4 = false;
	$scope.underMenu5 = false;
	$scope.viewsAllowed = "Grid & List";
	$scope.allAllowed = true;
	$scope.gridMode = true;	
	$scope.folderIcon = defaultFolderIcon;
	$scope.fontSize = 12;
	$scope.fontText = "Verdana";
	$scope.fontColor = "black";
	$scope.font = {'font-size':$scope.fontSize+'pt','font-family':$scope.fontText,'color':$scope.fontColor};
	
	
	$scope.enter = function(folder){
		$scope.currentFolder = folder;
		$scope.nrOfFolders = getNrOfFolders(folder);
		$scope.currDirName = folder.name;
		
	}
	$scope.goBack = function(){
		$scope.currentFolder = $scope.currentFolder.Parent;
		$scope.nrOfFolders = getNrOfFolders($scope.currentFolder);
		$scope.currDirName = $scope.currentFolder.name;
	}
	$scope.editMode = function(){
		$scope.editing = !$scope.editing;
		if($scope.editing){
			$scope.mode = "View Mode";
		}
		else{
			$scope.mode = "Edit Mode";
		}
	}
	$scope.add = function() {
		$scope.notAdded = false; 
		$scope.editing = true;
	}
	$scope.viewMenu = function(){
		$scope.underMenu0 = true;
	}
	$scope.applyViews = function(){
		$scope.underMenu0 = false;
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
	$scope.changeView = function(){
		$scope.gridMode = !$scope.gridMode;
	}
	$scope.bgMenu = function(){
		$scope.underMenu = true;
	}	
	$scope.fontMenu = function(){
		$scope.underMenu3 = true;
	}	
	$scope.fontColorMenu = function(){
		$scope.underMenu4 = true;
	}
	$scope.applyFont = function(){
		$scope.underMenu3 = false;
		$scope.font = {
			'font-size':$scope.fontSize+'pt',
			'font-family':$scope.fontText,
			'color':$scope.fontColor
		};
	}
	$scope.applyFontColor = function(){
		$scope.underMenu4 = false;
		$scope.font = {
			'font-size':$scope.fontSize+'pt',
			'font-family':$scope.fontText,
			'color':$scope.fontColor
		};
	}	
	$scope.folderIconMenu = function(){
		$scope.underMenu2 = true;
	}
	$scope.changeFolderIcon = function(i){
		$scope.underMenu2 = false;
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
		
		for(var j = 0; j < $scope.currentFolder.children.length; j++)
		{
			if($scope.currentFolder.children.type === 'Folder'){
				if($scope.currentFolder.children[j].checked)
				{
					$scope.currentFolder.children[j].img = $scope.folderIcon;
				}
			}				
		}
	}
	$scope.fileIconMenu = function(){
		$scope.underMenu5 = true;
	}
	$scope.changeFileIcon = function(i){
		$scope.underMenu5 = false;
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
		
		for(var j = 0; j < $scope.currentFolder.children.length; j++)
		{
			if($scope.currentFolder.children.type !== 'Folder'){
				if($scope.currentFolder.children[j].checked)
				{
					$scope.currentFolder.children[j].img = fileIcon;
				}
			}
		}
	}
	//deletefolder
	//deletefile
	//changebg
	//addRow
	//minusRow
	//addCol
	//minusCol
	$scope.addFolders = function(){
		var folder;
		if($scope.currentFolder.Parent === null){//rootfolder
			folder = new Folder("Folder"+($scope.nrOfFolders+1), 'Folder');
		}
		else{
			folder = new Folder($scope.currentFolder.name+"_"+($scope.nrOfFolders+1));
		}
		folder.img = $scope.folderIcon;
		$scope.currentFolder.add(folder);
		$scope.nrOfFolders = getNrOfFolders($scope.currentFolder);
	}
	//addDBFolder
	//minusFolder
	//addFontSize
	//minusFontsize
	//clearName
	//showListPreview
	
});
	
	
	
var getNrOfFolders = function(folder){
	var nr = 0;
	for(var i = 0; i < folder.children.length; i++){
		if(folder.children[i].type === 'Folder'){
			nr++;
		}
	}
	return nr;
}
