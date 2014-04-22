"use strict";

angular.module('mockApp').controller('CompCtrl', function($scope, $timeout){
	
    /*
    * Should be loaded automatically from the creator depending on login and appID or smt
    */
	$scope.folder = { "name": "Root", "type": "Folder", "img": null, "checked": false, "id": 2, "children": [{ "name": "Folder1", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 3, "children": [{ "name": "2013-10-06 15.14.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 7, "size": 258252, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-06 15.14.24.jpg", "$$hashKey": "0I3" }, { "name": "2013-10-10 13.10.18.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 8, "size": 2665266, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-10 13.10.18.jpg", "$$hashKey": "0I7" }, { "name": "2013-10-15 12.16.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 9, "size": 2576851, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 12.16.24.jpg", "$$hashKey": "0IB" }, { "name": "2013-10-15 15.16.04.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 10, "size": 1858921, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 15.16.04.jpg", "$$hashKey": "0IF" }, { "name": "2013-10-19 12.54.53.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 11, "size": 1985031, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-19 12.54.53.jpg", "$$hashKey": "0IJ" }], "$$hashKey": "00T" }, { "name": "Folder2", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 4, "children": [{ "name": "Folder2_1", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 12, "children": [], "$$hashKey": "0IZ" }], "$$hashKey": "00X" }, { "name": "Folder3", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 5, "children": [], "$$hashKey": "011" }, { "name": "Folder4", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 6, "children": [], "$$hashKey": "015" }] };
	$scope.savedSettings = { "nrOfFolders": 4, "cols": true, "nrOfCols": 2, "nrOfRows": 3, "colStyle": "col span_1_of_2", "rowStyleLi": "rowLi", "fNameSize": "15em", "dir": "Root", "editing": true, "mode": "Edit Mode", "notAdded": false, "root": true, "underMenu0": false, "underMenu": false, "underMenu2": false, "underMenu3": false, "underMenu4": false, "underMenu5": false, "underMenuViewAccess": false, "underMenuShareAccess": false, "underMenuMoveAccess": false, "underMenuSyncAccess": false, "viewsAllowed": "Grid & List", "allAllowed": true, "gridMode": true, "showThumb": true, "showFont": true, "listPrev": false, "fontTextInput": false, "folderIcon": "img/folder.png", "fileIcon": "img/file.png", "bgImage": { "background-image": "url(img/sunset.jpg)" }, "bgMini": "img/bw_sunset.jpg", "fontSize": 12, "fontText": "Verdana", "fontColor": "red", "font": { "font-size": "12pt", "font-family": "Verdana", "color": "red" }, "gridPreview": false, "height": 600, "width": 748 };
	$scope.savedPeople = [{ "name": "Nisse", "checked": false, "noViewAccess": false, "viewAccess": [{ "name": "2013-10-06 15.14.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 7, "size": 258252, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-06 15.14.24.jpg", "$$hashKey": "0I3" }, { "name": "2013-10-10 13.10.18.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 8, "size": 2665266, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-10 13.10.18.jpg", "$$hashKey": "0I7" }, { "name": "2013-10-15 12.16.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 9, "size": 2576851, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 12.16.24.jpg", "$$hashKey": "0IB" }, { "name": "2013-10-15 15.16.04.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 10, "size": 1858921, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 15.16.04.jpg", "$$hashKey": "0IF" }, { "name": "2013-10-19 12.54.53.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 11, "size": 1985031, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-19 12.54.53.jpg", "$$hashKey": "0IJ" }, { "name": "Folder1", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 3, "children": [{ "name": "2013-10-06 15.14.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 7, "size": 258252, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-06 15.14.24.jpg", "$$hashKey": "0I3" }, { "name": "2013-10-10 13.10.18.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 8, "size": 2665266, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-10 13.10.18.jpg", "$$hashKey": "0I7" }, { "name": "2013-10-15 12.16.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 9, "size": 2576851, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 12.16.24.jpg", "$$hashKey": "0IB" }, { "name": "2013-10-15 15.16.04.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 10, "size": 1858921, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 15.16.04.jpg", "$$hashKey": "0IF" }, { "name": "2013-10-19 12.54.53.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 11, "size": 1985031, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-19 12.54.53.jpg", "$$hashKey": "0IJ" }], "$$hashKey": "00T" }, { "name": "Folder2_1", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 12, "children": [], "$$hashKey": "0IZ" }, { "name": "Folder2", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 4, "children": [{ "name": "Folder2_1", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 12, "children": [], "$$hashKey": "0IZ" }], "$$hashKey": "00X" }], "shareAccess": [{ "name": "Folder2_1", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 12, "children": [], "$$hashKey": "0IZ" }, { "name": "Folder2", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 4, "children": [{ "name": "Folder2_1", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 12, "children": [], "$$hashKey": "0IZ" }], "$$hashKey": "00X" }], "moveAccess": [{ "name": "2013-10-06 15.14.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 7, "size": 258252, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-06 15.14.24.jpg", "$$hashKey": "0I3" }, { "name": "2013-10-10 13.10.18.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 8, "size": 2665266, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-10 13.10.18.jpg", "$$hashKey": "0I7" }, { "name": "2013-10-15 12.16.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 9, "size": 2576851, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 12.16.24.jpg", "$$hashKey": "0IB" }, { "name": "2013-10-15 15.16.04.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 10, "size": 1858921, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 15.16.04.jpg", "$$hashKey": "0IF" }, { "name": "2013-10-19 12.54.53.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 11, "size": 1985031, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-19 12.54.53.jpg", "$$hashKey": "0IJ" }, { "name": "Folder1", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 3, "children": [{ "name": "2013-10-06 15.14.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 7, "size": 258252, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-06 15.14.24.jpg", "$$hashKey": "0I3" }, { "name": "2013-10-10 13.10.18.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 8, "size": 2665266, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-10 13.10.18.jpg", "$$hashKey": "0I7" }, { "name": "2013-10-15 12.16.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 9, "size": 2576851, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 12.16.24.jpg", "$$hashKey": "0IB" }, { "name": "2013-10-15 15.16.04.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 10, "size": 1858921, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 15.16.04.jpg", "$$hashKey": "0IF" }, { "name": "2013-10-19 12.54.53.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 11, "size": 1985031, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-19 12.54.53.jpg", "$$hashKey": "0IJ" }], "$$hashKey": "00T" }], "syncAccess": [{ "name": "2013-10-06 15.14.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 7, "size": 258252, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-06 15.14.24.jpg", "$$hashKey": "0I3" }, { "name": "2013-10-10 13.10.18.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 8, "size": 2665266, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-10 13.10.18.jpg", "$$hashKey": "0I7" }, { "name": "2013-10-19 12.54.53.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 11, "size": 1985031, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-19 12.54.53.jpg", "$$hashKey": "0IJ" }], "$$hashKey": "00E" }, { "name": "Svenne", "checked": false, "noViewAccess": false, "viewAccess": [{ "name": "2013-10-06 15.14.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 7, "size": 258252, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-06 15.14.24.jpg", "$$hashKey": "0I3" }, { "name": "2013-10-10 13.10.18.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 8, "size": 2665266, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-10 13.10.18.jpg", "$$hashKey": "0I7" }, { "name": "2013-10-15 12.16.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 9, "size": 2576851, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 12.16.24.jpg", "$$hashKey": "0IB" }, { "name": "2013-10-15 15.16.04.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 10, "size": 1858921, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 15.16.04.jpg", "$$hashKey": "0IF" }, { "name": "2013-10-19 12.54.53.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 11, "size": 1985031, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-19 12.54.53.jpg", "$$hashKey": "0IJ" }, { "name": "Folder1", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 3, "children": [{ "name": "2013-10-06 15.14.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 7, "size": 258252, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-06 15.14.24.jpg", "$$hashKey": "0I3" }, { "name": "2013-10-10 13.10.18.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 8, "size": 2665266, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-10 13.10.18.jpg", "$$hashKey": "0I7" }, { "name": "2013-10-15 12.16.24.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 9, "size": 2576851, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 12.16.24.jpg", "$$hashKey": "0IB" }, { "name": "2013-10-15 15.16.04.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 10, "size": 1858921, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-15 15.16.04.jpg", "$$hashKey": "0IF" }, { "name": "2013-10-19 12.54.53.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 11, "size": 1985031, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Camera Uploads/2013-10-19 12.54.53.jpg", "$$hashKey": "0IJ" }], "$$hashKey": "00T" }, { "name": "Folder2_1", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 12, "children": [], "$$hashKey": "0IZ" }, { "name": "Folder2", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 4, "children": [{ "name": "Folder2_1", "type": "Folder", "img": "img/folder.png", "checked": false, "id": 12, "children": [], "$$hashKey": "0IZ" }], "$$hashKey": "00X" }], "shareAccess": [], "moveAccess": [], "syncAccess": [], "$$hashKey": "00F" }, { "name": "Kalle", "checked": false, "noViewAccess": true, "viewAccess": [], "shareAccess": [], "moveAccess": [], "syncAccess": [], "$$hashKey": "00G" }];
	init($scope.savedSettings, $scope.folder, $scope.savedPeople);

	/*
	*
	*/
	$scope.isSelectMode = false;
	$scope.selectMode = function () {
		$scope.isSelectMode = !$scope.isSelectMode;
		if (!$scope.isSelectMode) {
			//deselect all TODO
		}
	}
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
function init(savedSettings, folder, savedPeople) {
    var scope = angular.element($("#ng")).scope();
    importJsonSettings(savedSettings);
    importJsonFolder(folder, rootFolder);
    importJsonPersons(savedPeople);
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

function importJsonPersons(jsonObj) {
	var scope = angular.element($("#ng")).scope();
	for (var prop in jsonObj) scope.persons[prop] = jsonObj[prop];
};




