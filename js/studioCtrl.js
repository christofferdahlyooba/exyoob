"use strict";

var rootFolder = new Folder('Root');
var defaultFileIcon = 'img/file.png';
var defaultFolderIcon = 'img/folder.png';

angular.module('mockApp').controller('FirstController', function($scope, $timeout){
	
	$scope.settings = {
		currentFolder: rootFolder,
		nrOfFolders: 0,
		cols: true,
		nrOfCols: 3,
		nrOfRows: 3,
		colStyle: 'col span_1_of_3',
		rowStyleLi: 'rowLi',
		dir: rootFolder.name,
		editing: false,
		mode: 'Edit Mode',
		notAdded: true,
		underMenu0: false,
		underMenu: false,
		underMenu2: false,
		underMenu3: false,
		underMenu4: false, 
		underMenu5: false,
		viewsAllowed: 'Grid & List',
		allAllowed: true,
		gridMode: true,
		showThumb: false,
		showFont: false,
		folderIcon: defaultFolderIcon,
		fileIcon: defaultFileIcon,
		bgImage: {'background-image':'url(img/bg.jpg)'},
		fontSize: 12,
		fontText: 'Verdana',
		fontColor: 'black',
		font: {'font-size':'12pt','font-family':"Verdana",'color':"black"},
		height: 600,
		width: 748
	};
	
	
	$scope.enter = function(folder){
		$scope.settings.currentFolder = folder;
		$scope.settings.nrOfFolders = $scope.getNrOfFolders(folder);
		$scope.settings.dir = folderPathString(getFolderPath($scope.settings.currentFolder));
		$timeout($scope.updateRowMargins);
	}
	
	$scope.goBack = function(){
		if($scope.settings.currentFolder.Parent !== null){
			$scope.settings.currentFolder = $scope.settings.currentFolder.Parent;
			$scope.settings.nrOfFolders = $scope.getNrOfFolders($scope.settings.currentFolder);
			$scope.settings.dir = folderPathString(getFolderPath($scope.settings.currentFolder));
			$timeout($scope.updateRowMargins);
		}
	}
	$scope.editMode = function(){
		$scope.settings.editing = !$scope.settings.editing;
		if($scope.settings.editing){
			$scope.settings.mode = "View Mode";
		}
		else{
			$scope.settings.mode = "Edit Mode";
		}
	}
	$scope.add = function() {
		$scope.settings.notAdded = false; 
		$scope.settings.editing = true;
	}
	$scope.viewMenu = function(){
		$scope.settings.underMenu0 = true;
	}
	$scope.applyViews = function(){
		$scope.settings.underMenu0 = false;
		if($scope.settings.viewsAllowed === 'Grid & List')
		{
			$scope.settings.allAllowed = true;
		}
		else if($scope.settings.viewsAllowed === 'Grid')
		{
			$scope.settings.allAllowed = false;
			if(!$scope.settings.gridMode)
			{
				$scope.changeView();
			}
		}
		else if($scope.settings.viewsAllowed === 'List')
		{
			$scope.settings.allAllowed = false;
			if($scope.settings.gridMode)
			{
				$scope.changeView();
			}
		}		
	}
	$scope.changeView = function(){
		$scope.settings.gridMode = !$scope.settings.gridMode;
	}
	$scope.bgMenu = function(){
		$scope.settings.underMenu = true;
	}	
	$scope.fontMenu = function(){
		$scope.settings.underMenu3 = true;
	}	
	$scope.fontColorMenu = function(){
		$scope.settings.underMenu4 = true;
	}
	$scope.applyFont = function(){
		$scope.settings.underMenu3 = false;
		$scope.settings.font = {
			'font-size':$scope.settings.fontSize+'pt',
			'font-family':$scope.settings.fontText,
			'color':$scope.settings.fontColor
		};
	}
	$scope.applyFontColor = function(){
		$scope.settings.underMenu4 = false;
		$scope.settings.font = {
			'font-size':$scope.settings.fontSize+'pt',
			'font-family':$scope.settings.fontText,
			'color':$scope.settings.fontColor
		};
	}	
	$scope.folderIconMenu = function(){
		$scope.settings.underMenu2 = true;
	}
	$scope.changeFolderIcon = function(i){
		$scope.settings.underMenu2 = false;
		if(i === 1)
		{
			$scope.settings.folderIcon = 'img/folder.png';
		}
		else if(i === 2)
		{
			$scope.settings.folderIcon = 'img/picFolder.png';
		}
		else if(i === 3)
		{
			$scope.settings.folderIcon = 'img/musicFolder.png';
		}
		var folders = $scope.getFolders($scope.settings.currentFolder);
		for(var j = 0; j < folders.length; j++)
		{
			if(folders[j].checked)
			{
				folders[j].img = $scope.settings.folderIcon;
			}		
		}
	}
	$scope.fileIconMenu = function(){
		$scope.settings.underMenu5 = true;
	}
	$scope.changeFileIcon = function(i){
		$scope.settings.underMenu5 = false;
		if(i === 1)
		{
			$scope.settings.fileIcon = 'img/file.png';
		}
		else if(i === 2)
		{
			$scope.settings.fileIcon = 'img/picFile.png';
		}
		else if(i === 3)
		{
			$scope.settings.fileIcon = 'img/pdfFile.jpg';
		}
		var files = $scope.getFiles($scope.settings.currentFolder);
		for(var j = 0; j < files.length; j++)
		{
			if(files[j].checked)
			{
				files[j].img = $scope.settings.fileIcon;
			}
		}
	}
	$scope.deleteFolder = function(folder){
		$scope.settings.currentFolder.remove(folder);
		$scope.settings.nrOfFolders = $scope.getNrOfFolders($scope.settings.currentFolder);
	}
	$scope.deleteFile = function(file){
		$scope.settings.currentFolder.remove(file);
	}
	$scope.changeBg = function(i){
		$scope.settings.underMenu=false;
		if(i === 1)
		{
			$scope.settings.bgImage = {'background-image':'url(img/bg.jpg)'};
		}
		else if(i === 2)
		{
			$scope.settings.bgImage = {'background-image':'url(img/sand.jpg)'};
		}
		else if(i === 3)
		{
			$scope.settings.bgImage = {'background-image':'url(img/sunset.jpg)'};
		}
		else
		{
			$scope.settings.bgImage = {'background-image':'url(img/sky.jpg)'};
		}
	}
	$scope.changeCol = function(i) {
		if(i<0){
			if($scope.settings.nrOfCols > 1){				
				$scope.settings.nrOfCols --;
				$scope.settings.colStyle = "col span_1_of_"+$scope.settings.nrOfCols;
			}
		}
		else{
			if($scope.settings.nrOfCols < 12){
				$scope.settings.nrOfCols++;
				$scope.settings.colStyle = "col span_1_of_"+$scope.settings.nrOfCols;
			}
		}
	}
	$scope.changeRow = function(i) {
		if(i<0){
			if($scope.settings.nrOfRows > 1){				
				$scope.settings.nrOfRows --;
				changeRowLiMargins($scope.calcMargins());
			}
		}
		else{
			if($scope.settings.nrOfRows < 10){
				$scope.settings.nrOfRows++;
				changeRowLiMargins($scope.calcMargins());
			}
		}
	}
	$scope.addFolders = function(){
		var folder;
		if($scope.settings.currentFolder.Parent === null){//rootfolder
			folder = new Folder("Folder"+($scope.settings.nrOfFolders+1));
		}
		else{
			folder = new Folder($scope.settings.currentFolder.name+"_"+($scope.settings.nrOfFolders+1));
		}
		folder.img = $scope.settings.folderIcon;
		$scope.settings.currentFolder.add(folder);
		$scope.settings.nrOfFolders = $scope.getNrOfFolders($scope.settings.currentFolder);
		$timeout($scope.updateRowMargins);
	}
	//addDBFolder
	//minusFolder
	$scope.changeFontSize = function(i){
		if(i > 0){
			$scope.settings.fontSize++;
			$scope.settings.font = {'font-size':$scope.settings.fontSize+'pt','font-family':$scope.settings.fontText,'color':$scope.settings.fontColor};
		}
		else{
			if($scope.settings.fontSize > 1){
				$scope.settings.fontSize--;
				$scope.settings.font = {'font-size':$scope.settings.fontSize+'pt','font-family':$scope.settings.fontText,'color':$scope.settings.fontColor};
			}
		}
	}
	$scope.clearName = function(index, node){
		if(node.type === 'Folder'){
			document.getElementById("folder-"+index).focus();
			node.name = '';
		}
		else{
			document.getElementById("file-"+index).focus();
			node.name = '';	
		}
	}
	$scope.showListPreview = function(f){
		// Only process image files.
		 if (!f.type.match('image.*')) {
			 return;
		 }
		
		var preview = document.getElementById("preview");
		var previewDiv = document.getElementById("previewDiv");
		var divWidth = previewDiv.offsetWidth;
		var divHeight = previewDiv.offsetHeight;
		var ctx = preview.getContext("2d");
		
		var img = new Image;
		img.src = f.data;
		img.onload= function(){			
			preview.width = divWidth - 20;
			preview.height = 560;
			var aspectW = preview.width/img.width;
			var aspectH = preview.height/img.height;
			ctx.drawImage(img,0,0, img.width*aspectW,img.height*aspectH);
		}
	}	
	$scope.getNrOfFolders = function(folder){
		var nr = 0;
		var folders = $scope.getFolders(folder);
		for(var i = 0; i < folders.length; i++){
			nr++;
		}
		return nr;
	}
	$scope.getNrOfParents = function(folder){
		var nr = 0;
		while(folder.Parent !== null){
			folder = folder.Parent;
			nr++;
		}
		return nr;	
	}	
	$scope.getFolders = function(folder){
		var ret = [];
		for(var i = 0; i < folder.children.length; i++){
			if(folder.children[i].type === 'Folder'){
				ret.push(folder.children[i]);
			}
		}
		return ret;
	}
	$scope.getFiles = function(folder){
		var ret = [];
		for(var i = 0; i < folder.children.length; i++){
			if(folder.children[i].type !== 'Folder'){
				ret.push(folder.children[i]);
			}
		}
		return ret;
	}

	$scope.exportToJson = function(){
		$scope.exportSettingsToJson();
		console.log(JSON.stringify($scope.settings.currentFolder, replacer));		
		//return JSON.stringify($scope.currentFolder, replacer);
	}
	
	$scope.exportSettingsToJson = function(){
		console.log(JSON.stringify($scope.settings, replacer2));		
		//return JSON.stringify($scope.currentFolder, replacer);
	}
	
	$scope.updateRowMargins = function updateRowMargins(){
		var size = $scope.calcMargins();
		changeRowLiMargins(size);
	}
	$scope.updateHeight = function(size){
		var rowStyle = document.getElementById("rowStyle");
		rowStyle.style.height = size+'px';
		$scope.settings.height = size;
		changeRowLiMargins($scope.calcMargins());
	}
	$scope.calcMargins = function calcMargins(){
		if(!$scope.settings.showFont){
			return (($scope.settings.height-84*$scope.settings.nrOfRows)*(1/$scope.settings.nrOfRows))+24;
		}
		return ($scope.settings.height-84*$scope.settings.nrOfRows)*(1/$scope.settings.nrOfRows);
	}
	$scope.changeScrollDir = function(){
		var contentPanel = document.getElementsByClassName("contentpanel2");
		if($scope.settings.cols){
			contentPanel[1].style.overflowY = 'auto';
			contentPanel[1].style.overflowX = 'hidden';
		}else{
			contentPanel[1].style.overflowX = 'auto';
			contentPanel[1].style.overflowY = 'hidden';
		}
	}
	$scope.saveNewSize = function(w, h){
		$scope.settings.width = w;
		$scope.settings.height = h;
	}
	
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
		setTimeout(scope.updateRowMargins);
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
	setTimeout(scope.updateRowMargins);
}



function changeRowLiMargins(margin){
	var rowLi = document.getElementsByClassName("rowLi");
	var newMargin = ''+margin+'px'
	for (var i = 0; i<rowLi.length; i++){
		rowLi[i].style.marginBottom = newMargin;
	}
	
}

function getFolderPath(folder, path){
	if(path === undefined)
	{
		path = [];
	}
		path.push(folder.name);
		if(folder.Parent!=null){
			getFolderPath(folder.Parent, path);
		}
		return path;
}
function folderPathString(path){
	var ret= '';
	for(var i = path.length-1; i>=0; i--){
		if(i!==0){
			ret += path[i] + ' -> ';
		}else{		
			ret += path[i];
		}
	}
	return ret;
}

function togglePlaceHolders(){
	var scope = angular.element($("#ng")).scope();
	var margin = 0;
	if(!scope.showFont){
		margin = 24;
	}
	if(scope.cols){
		var colStyle = document.getElementsByClassName(scope.colStyle);	
		for(var i = 0; i<colStyle.length; i++){
			colStyle[i].style.marginBottom = margin+'px';
		}
	}else{
		var rowLi = document.getElementsByClassName("rowLi");
		for(var i = 0; i<rowLi.length; i++){
			margin = scope.calcMargins();
			rowLi[i].style.marginBottom = margin+'px';
		}
		
	}	
}

var replacer = function(key, value)
{
  if (key=="Parent" || key ==='data')
  {
      return undefined;
  }
  else return value;
}
var replacer2 = function(key, value)
{
  if (key=="currentFolder")
  {
      return undefined;
  }
  else return value;
}
