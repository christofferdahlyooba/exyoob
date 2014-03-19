"use strict";

var rootFolder = new Folder('Root');
var defaultFileIcon = 'img/file.png';
var defaultFolderIcon = 'img/folder.png';

angular.module('mockApp').controller('CompCtrl', function($scope, $timeout){
	
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
	
	$scope.folder = {"name":"Root","type":"Folder","img":null,"checked":false,"children":[{"name":"Folder1","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"00D"},{"name":"Folder2","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"00H"},{"name":"Folder3","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"00L"},{"name":"Folder4","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"00P"},{"name":"Folder5","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"00T"},{"name":"Folder6","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"00X"},{"name":"Folder7","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"011"},{"name":"Folder8","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"015"},{"name":"Folder9","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"019"},{"name":"Folder10","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"01D"},{"name":"Folder11","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"01H"},{"name":"Folder12","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"01L"},{"name":"Folder13","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"01P"},{"name":"Folder14","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"01T"},{"name":"Folder15","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"01X"},{"name":"Folder16","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"021"},{"name":"Folder17","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"025"},{"name":"Folder18","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"029"},{"name":"Folder19","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"02D"},{"name":"Folder20","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"02H"},{"name":"Folder21","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"02L"},{"name":"Folder22","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"02P"},{"name":"Folder23","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"02T"},{"name":"Folder24","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"02X"},{"name":"Folder25","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"031"},{"name":"Folder26","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"035"},{"name":"Folder27","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"039"},{"name":"Folder28","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"03D"},{"name":"Folder29","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"03H"},{"name":"Folder30","type":"Folder","img":"img/folder.png","checked":false,"children":[],"$$hashKey":"03L"}]};
	$scope.savedSettings = {"nrOfFolders":44,"cols":false,"nrOfCols":3,"nrOfRows":2,"colStyle":"col span_1_of_3","rowStyleLi":"rowLi","dir":"Root","editing":true,"mode":"Edit Mode","notAdded":false,"underMenu0":false,"underMenu":false,"underMenu2":false,"underMenu3":false,"underMenu4":false,"underMenu5":false,"viewsAllowed":"Grid & List","allAllowed":true,"gridMode":true,"showThumb":true,"showFont":true,"folderIcon":"img/folder.png","fileIcon":"img/file.png","bgImage":{"background-image":"url(img/bg.jpg)"},"fontSize":12,"fontText":"Verdana","fontColor":"black","font":{"font-size":"12pt","font-family":"Verdana","color":"black"}};
	
	
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

	$scope.changeView = function(){
		$scope.settings.gridMode = !$scope.settings.gridMode;
		//$timeout($scope.setSize);
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
	$scope.updateRowMargins = function updateRowMargins(){
		var size = $scope.calcMargins();
		changeRowLiMargins(size);
	}
	
	$scope.updateHeight = function(size){
		var rowStyle = document.getElementById("rowStyle");
		rowStyle.style.height = size+'px';
		changeRowLiMargins($scope.calcMargins());
	}
	
	$scope.calcMargins = function calcMargins(){
		if(!$scope.settings.showFont){
			return ((getHeight()-61-84*$scope.settings.nrOfRows)*(1/$scope.settings.nrOfRows))+24;
		}
		return (getHeight()-61-84*$scope.settings.nrOfRows)*(1/$scope.settings.nrOfRows);
	}
	
	$scope.setSize = function(){
		var contentPanel = document.getElementsByClassName("contentpanel2");
		var number = 0;
		if($scope.settings.gridMode){
			number = 1;
		}
		if($scope.settings.cols){
			contentPanel[number].style.overflowY = 'auto';
			contentPanel[number].style.overflowX = 'hidden';
		}else{
			contentPanel[number].style.overflowX = 'auto';
			contentPanel[number].style.overflowY = 'hidden';
		}
		contentPanel[number].style.height = getHeight()-61+'px';
		var contentPanel = document.getElementsByClassName("panel-default");
		contentPanel[number].style.width = getWidth()+'px';
		
	}
	
	$scope.init = function(savedSettings,folder){
		importJsonSettings(savedSettings);
		importJsonFolder(folder, rootFolder);		
		$timeout($scope.setSize);
		$scope.settings.colStyle = 'col span_1_of_'+$scope.settings.nrOfCols;
		$scope.updateHeight(getHeight()-61);
		$timeout($scope.updateRowMargins);
	}
	$scope.init($scope.savedSettings, $scope.folder);
	
	function getWidth() {
		if (self.innerWidth) {
		   return self.innerWidth;
		}
		else if (document.documentElement && document.documentElement.clientHeight){
			return document.documentElement.clientWidth;
		}
		else if (document.body) {
			return document.body.clientWidth;
		}
		return 0;
	}
	function getHeight() {
		if (self.innerHeight) {
		   return self.innerHeight;
		}
		else if (document.documentElement && document.documentElement.clientHeight){
			return document.documentElement.clientHeight;
		}
		else if (document.body) {
			return document.body.clientHeight;
		}
		return 0;
	}
	
	
});

function importJsonFolder(jsonObj, curr){
	var currentFolder = curr;
	
	var scope = angular.element($("#ng")).scope();
	if(jsonObj.children.length > 0){
		for(var i = 0, obj = jsonObj.children; i < obj.length; i++){
			if(obj[i].type === 'Folder'){
				var folder = new Folder(obj[i].name);
				folder.img = obj[i].img;
				currentFolder.add(folder);
				scope.nrOfFolders++;
				importJsonFolder(obj[i], folder);
			}
			else{
				var file = new File(obj[i].name, obj[i].type);
				file.img = obj[i].img;
				file.data = obj[i].data;
				file.size = obj[i].size;
				file.lastModified = obj[i].lastModified;
				file.isImg = obj[i].isImg;
				currentFolder.add(file);
			}				
		}
	}
	return '';
}

function importJsonSettings(jsonObj){
	var scope = angular.element($("#ng")).scope();
	for (var prop in jsonObj) scope.settings[prop] = jsonObj[prop];
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