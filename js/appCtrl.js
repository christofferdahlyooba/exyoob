"use strict";

angular.module('mockApp').controller('CompCtrl', function($scope, $timeout){
	
    /*
    * Should be loaded automatically from the creator depending on login and appID or smt
    */
	$scope.folder = { "name": "Root", "type": "Folder", "img": null, "checked": false, "children": [{ "name": "Bilder", "type": "Folder", "img": "img/folder.png", "checked": false, "children": [{ "name": "2013-10-10 13.10.18.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "size": 2665266, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-10 13.10.18.jpg", "$$hashKey": "0IH" }, { "name": "2013-10-06 15.14.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "size": 258252, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-06 15.14.24.jpg", "$$hashKey": "0IL" }, { "name": "2013-10-15 12.16.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "size": 2576851, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 12.16.24.jpg", "$$hashKey": "0IP" }, { "name": "2013-10-15 15.16.04.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "size": 1858921, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 15.16.04.jpg", "$$hashKey": "0IT" }, { "name": "2013-10-19 12.54.58.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "size": 2756011, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-19 12.54.58.jpg", "$$hashKey": "0IX" }, { "name": "2013-10-19 12.54.53.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "size": 1985031, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-19 12.54.53.jpg", "$$hashKey": "0J1" }], "$$hashKey": "00T" }, { "name": "dev", "type": "Folder", "img": "img/dbFolder.png", "checked": false, "children": [{ "name": "Angular", "type": "Folder", "img": "img/dbFolder.png", "checked": false, "children": [{ "name": "angular.min.js", "type": "application/javascript", "img": "img/dbFile.png", "checked": false, "size": 100085, "lastModified": null, "isImg": false, "thumb": null, "origin": "Dropbox", "path": "/dev/Angular/angular.min.js" }, { "name": "index.html", "type": "text/html", "img": "img/dbFile.png", "checked": false, "size": 308, "lastModified": null, "isImg": false, "thumb": null, "origin": "Dropbox", "path": "/dev/Angular/index.html" }, { "name": "myAppCtrl.js", "type": "application/javascript", "img": "img/dbFile.png", "checked": false, "size": 163, "lastModified": null, "isImg": false, "thumb": null, "origin": "Dropbox", "path": "/dev/Angular/myAppCtrl.js" }] }], "$$hashKey": "023" }] };
	$scope.savedSettings = { "nrOfFolders": 2, "cols": true, "nrOfCols": 2, "nrOfRows": 3, "colStyle": "col span_1_of_2", "rowStyleLi": "rowLi", "fNameSize": "15em", "dir": "Root", "editing": true, "mode": "Edit Mode", "notAdded": false, "root": true, "underMenu0": false, "underMenu": false, "underMenu2": false, "underMenu3": false, "underMenu4": false, "underMenu5": false, "underMenuViewAccess": false, "underMenuShareAccess": false, "underMenuMoveAccess": false, "underMenuSyncAccess": false, "viewsAllowed": "Grid", "allAllowed": false, "gridMode": true, "showThumb": true, "showFont": true, "listPrev": false, "folderIcon": "img/folder.png", "fileIcon": "img/file.png", "bgImage": { "background-image": "url(img/sunset.jpg)" }, "bgMini": "img/bw_sunset.jpg", "fontSize": 12, "fontText": "Verdana", "fontColor": "red", "font": { "font-size": "12pt", "font-family": "Verdana", "color": "red" }, "gridPreview": false, "height": 600, "width": 748, "nrOfFolder": null };
		
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
                if (obj[i].data === undefined) {
                	file.data = null;
                }
                else {
                	file.data = obj[i].data;
                }
                file.size = obj[i].size;
                file.lastModified = obj[i].lastModified;
                file.isImg = obj[i].isImg;
                file.origin = obj[i].origin;
                file.path = obj[i].path;
                file.thumb = obj[i].thumb;
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




