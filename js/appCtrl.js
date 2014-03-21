"use strict";

angular.module('mockApp').controller('CompCtrl', function($scope, $timeout){
	
    /*
    * Should be loaded automatically from the creator depending on login and appID or smt
    */
    $scope.folder = { "name": "Root", "type": "Folder", "img": null, "checked": false, "children": [{ "name": "Folder1", "type": "Folder", "img": "img/folder.png", "checked": false, "children": [{ "name": "Folder1_1", "type": "Folder", "img": "img/folder.png", "checked": false, "children": [], "$$hashKey": "012" }], "$$hashKey": "00E" }, { "name": "Folder2", "type": "Folder", "img": "img/folder.png", "checked": false, "children": [], "$$hashKey": "00I" }, { "name": "Folder3", "type": "Folder", "img": "img/folder.png", "checked": false, "children": [], "$$hashKey": "00M" }, { "name": "Folder4", "type": "Folder", "img": "img/folder.png", "checked": false, "children": [], "$$hashKey": "00Q" }, { "name": "Lighthouse.jpg", "type": "image/jpeg", "img": "img/file.png", "checked": false, "size": 561276, "lastModified": "2009-07-14T05:32:31.000Z", "isImg": true, "$$hashKey": "00U" }, { "name": "Penguins.jpg", "type": "image/jpeg", "img": "img/file.png", "checked": false, "size": 777835, "lastModified": "2009-07-14T05:32:31.000Z", "isImg": true, "$$hashKey": "00Y" }] };
	$scope.savedSettings = { "nrOfFolders": 4, "cols": true, "nrOfCols": 3, "nrOfRows": 3, "colStyle": "col span_1_of_3", "rowStyleLi": "rowLi", "dir": "Root", "editing": true, "mode": "View Mode", "notAdded": false, "underMenu0": false, "underMenu": false, "underMenu2": false, "underMenu3": false, "underMenu4": false, "underMenu5": false, "viewsAllowed": "Grid & List", "allAllowed": true, "gridMode": true, "showThumb": true, "showFont": true, "folderIcon": "img/folder.png", "fileIcon": "img/file.png", "bgImage": { "background-image": "url(img/bg.jpg)" }, "fontSize": 12, "fontText": "Verdana", "fontColor": "black", "font": { "font-size": "12pt", "font-family": "Verdana", "color": "black" }, "gridPreview": false, "height": 600, "width": 748 };
		
	init($scope.savedSettings, $scope.folder);
});

/*
* Sets the size of the content and changing scrollbar visibility
*/
function setSize() {
    var scope = angular.element($("#ng")).scope();
    var contentPanel = document.getElementsByClassName("contentpanel2");
    var number = 0;
    if (scope.settings.gridMode) {
        number = 1;
    }
    if (scope.settings.cols) {
        contentPanel[number].style.overflowY = 'auto';
        contentPanel[number].style.overflowX = 'hidden';
    } else {
        contentPanel[number].style.overflowX = 'auto';
        contentPanel[number].style.overflowY = 'hidden';
    }
    contentPanel[number].style.height = getHeight() - 61 + 'px';
    var contentPanel = document.getElementsByClassName("panel-default");
    contentPanel[number].style.width = getWidth() + 'px';

};

/*
* Init the view by calling import and size functions
*/
function init(savedSettings, folder) {
    var scope = angular.element($("#ng")).scope();
    importJsonSettings(savedSettings);
    importJsonFolder(folder, rootFolder);
    setTimeout(setSize);
    scope.settings.colStyle = 'col span_1_of_' + scope.settings.nrOfCols;
    updateHeight(getHeight() - 61);
    setTimeout(updateRowMargins);
};

/*
* Gets the width of the browser
*/
function getWidth() {
    if (self.innerWidth) {
        return self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        return document.documentElement.clientWidth;
    }
    else if (document.body) {
        return document.body.clientWidth;
    }
    return 0;
};

/*
* Gets the height of the browser
*/
function getHeight() {
    if (self.innerHeight) {
        return self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        return document.documentElement.clientHeight;
    }
    else if (document.body) {
        return document.body.clientHeight;
    }
    return 0;
};

/*
* Imports files and folders
*/
function importJsonFolder(jsonObj, curr) {
    var currentFolder = curr;

    var scope = angular.element($("#ng")).scope();
    if (jsonObj.children.length > 0) {
        for (var i = 0, obj = jsonObj.children; i < obj.length; i++) {
            if (obj[i].type === 'Folder') {
                var folder = new Folder(obj[i].name);
                folder.img = obj[i].img;
                currentFolder.add(folder);
                scope.nrOfFolders++;
                importJsonFolder(obj[i], folder);
            }
            else {
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
};

/*
* Imports settings
*/
function importJsonSettings(jsonObj) {
    var scope = angular.element($("#ng")).scope();
    for (var prop in jsonObj) scope.settings[prop] = jsonObj[prop];
};




