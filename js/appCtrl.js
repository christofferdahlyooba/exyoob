"use strict";

angular.module('mockApp').controller('CompCtrl', function($scope, $timeout){
	
    /*
    * Should be loaded automatically from the creator depending on login and appID or smt
    */
	$scope.folder = { "name": "Root", "type": "Folder", "img": null, "checked": false, "id": 2, "children": [{ "name": "Dokument", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 3, "children": [{ "name": "About-face-3.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 28, "size": 10864588, "lastModified": "2014-04-10T09:04:04.000Z", "isImg": false, "thumb": null, "$$hashKey": "06O" }, { "name": "Exjobb_anvisning_2014.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 29, "size": 163235, "lastModified": "2014-03-28T08:24:13.000Z", "isImg": false, "thumb": null, "$$hashKey": "06S" }, { "name": "source.zip", "type": "", "img": "img/file.png", "checked": false, "id": 30, "size": 8980130, "lastModified": "2014-04-08T13:45:53.000Z", "isImg": false, "thumb": null, "$$hashKey": "06W" }, { "name": "WinSCP.ini", "type": "", "img": "img/file.png", "checked": false, "id": 31, "size": 13366, "lastModified": "2014-04-16T13:01:46.000Z", "isImg": false, "thumb": null, "$$hashKey": "070" }], "$$hashKey": "00T" }, { "name": "Bilder", "type": "Folder", "img": "img/picFolder.png", "checked": true, "id": 4, "children": [{ "name": "Hydrangeashejhejhejhejhejhe jhejheöahwdöawhdöawhdaökwjdhaöwkjdhaökwjdhaökwjdahöwkjdhaöwkjdhaökwjdhjhej hejhejhejhejhejhejhejhejhejdådådådådådådåddå.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 20, "size": 595284, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Hydrangeas.jpg", "$$hashKey": "04D" }, { "name": "Desert.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 21, "size": 845941, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Desert.jpg", "$$hashKey": "04H" }, { "name": "Jellyfish.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 22, "size": 775702, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Jellyfish.jpg", "$$hashKey": "04I" }, { "name": "Chrysanthemum.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 23, "size": 879394, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Chrysanthemum.jpg", "$$hashKey": "04J" }, { "name": "Lighthouse.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 24, "size": 561276, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Lighthouse.jpg", "$$hashKey": "04T" }, { "name": "Koala.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 25, "size": 780831, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Koala.jpg", "$$hashKey": "04X" }, { "name": "Penguins.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 26, "size": 777835, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Penguins.jpg", "$$hashKey": "04Y" }, { "name": "Tulips.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 27, "size": 620888, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Tulips.jpg", "$$hashKey": "055" }], "$$hashKey": "00X" }, { "name": "Annat kul", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 5, "children": [], "$$hashKey": "011" }, { "name": "Musik?", "type": "Folder", "img": "img/musicFolder.png", "checked": true, "id": 6, "children": [], "$$hashKey": "015" }, { "name": "Folder5", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 7, "children": [], "$$hashKey": "019" }, { "name": "Folder6", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 8, "children": [], "$$hashKey": "01D" }, { "name": "Folder7", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 9, "children": [], "$$hashKey": "01H" }, { "name": "Folder8", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 10, "children": [], "$$hashKey": "01L" }, { "name": "Folder9", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 11, "children": [], "$$hashKey": "01P" }, { "name": "Folder10", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 12, "children": [], "$$hashKey": "01T" }, { "name": "Folder11", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 13, "children": [], "$$hashKey": "01X" }, { "name": "Folder12", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 14, "children": [], "$$hashKey": "021" }, { "name": "Folder13", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 15, "children": [], "$$hashKey": "025" }, { "name": "Folder14", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 16, "children": [], "$$hashKey": "029" }, { "name": "Folder15", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 17, "children": [], "$$hashKey": "02D" }, { "name": "Folder16", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 18, "children": [], "$$hashKey": "02H" }, { "name": "Folder17", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 19, "children": [], "$$hashKey": "02L" }] };
	$scope.savedSettings = { "nrOfFolders": 17, "cols": true, "nrOfCols": 2, "nrOfRows": 2, "colStyle": "col span_1_of_2", "rowStyleLi": "rowLi", "fNameSize": "15em", "dir": "Root", "editing": true, "mode": "Edit Mode", "notAdded": false, "root": true, "underMenu0": false, "underMenu": false, "underMenu2": false, "underMenu3": false, "underMenu4": false, "underMenu5": false, "underMenuViewAccess": false, "underMenuShareAccess": false, "underMenuMoveAccess": false, "underMenuSyncAccess": false, "inFavFolder": false, "viewsAllowed": "Grid & List", "allAllowed": true, "gridMode": true, "showThumb": true, "showFont": true, "listPrev": false, "fontTextInput": false, "noCheck": false, "folderIcon": "img/folder.png", "fileIcon": "img/file.png", "bgImage": { "background-color": "white" }, "bgMini": "img/bw_none.jpg", "fontSize": 12, "fontText": "Arial", "fontColor": "black", "font": { "font-size": "12pt", "font-family": "Verdana", "color": "black" }, "gridPreview": false, "height": 600, "width": 748 };
	$scope.savedPeople = [{ "name": "Nisse", "checked": false, "noViewAccess": false, "viewAccess": [{ "name": "About-face-3.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 28, "size": 10864588, "lastModified": "2014-04-10T09:04:04.000Z", "isImg": false, "thumb": null, "$$hashKey": "06O" }, { "name": "Exjobb_anvisning_2014.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 29, "size": 163235, "lastModified": "2014-03-28T08:24:13.000Z", "isImg": false, "thumb": null, "$$hashKey": "06S" }, { "name": "source.zip", "type": "", "img": "img/file.png", "checked": false, "id": 30, "size": 8980130, "lastModified": "2014-04-08T13:45:53.000Z", "isImg": false, "thumb": null, "$$hashKey": "06W" }, { "name": "WinSCP.ini", "type": "", "img": "img/file.png", "checked": false, "id": 31, "size": 13366, "lastModified": "2014-04-16T13:01:46.000Z", "isImg": false, "thumb": null, "$$hashKey": "070" }, { "name": "Dokument", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 3, "children": [{ "name": "About-face-3.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 28, "size": 10864588, "lastModified": "2014-04-10T09:04:04.000Z", "isImg": false, "thumb": null, "$$hashKey": "06O" }, { "name": "Exjobb_anvisning_2014.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 29, "size": 163235, "lastModified": "2014-03-28T08:24:13.000Z", "isImg": false, "thumb": null, "$$hashKey": "06S" }, { "name": "source.zip", "type": "", "img": "img/file.png", "checked": false, "id": 30, "size": 8980130, "lastModified": "2014-04-08T13:45:53.000Z", "isImg": false, "thumb": null, "$$hashKey": "06W" }, { "name": "WinSCP.ini", "type": "", "img": "img/file.png", "checked": false, "id": 31, "size": 13366, "lastModified": "2014-04-16T13:01:46.000Z", "isImg": false, "thumb": null, "$$hashKey": "070" }], "$$hashKey": "00T" }, { "name": "Hydrangeas.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 20, "size": 595284, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Hydrangeas.jpg", "$$hashKey": "04D" }, { "name": "Desert.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 21, "size": 845941, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Desert.jpg", "$$hashKey": "04H" }, { "name": "Jellyfish.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 22, "size": 775702, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Jellyfish.jpg", "$$hashKey": "04I" }, { "name": "Chrysanthemum.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 23, "size": 879394, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Chrysanthemum.jpg", "$$hashKey": "04J" }, { "name": "Lighthouse.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 24, "size": 561276, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Lighthouse.jpg", "$$hashKey": "04T" }, { "name": "Koala.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 25, "size": 780831, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Koala.jpg", "$$hashKey": "04X" }, { "name": "Penguins.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 26, "size": 777835, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Penguins.jpg", "$$hashKey": "04Y" }, { "name": "Tulips.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 27, "size": 620888, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Tulips.jpg", "$$hashKey": "055" }, { "name": "Bilder", "type": "Folder", "img": "img/picFolder.png", "checked": true, "id": 4, "children": [{ "name": "Hydrangeas.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 20, "size": 595284, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Hydrangeas.jpg", "$$hashKey": "04D" }, { "name": "Desert.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 21, "size": 845941, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Desert.jpg", "$$hashKey": "04H" }, { "name": "Jellyfish.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 22, "size": 775702, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Jellyfish.jpg", "$$hashKey": "04I" }, { "name": "Chrysanthemum.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 23, "size": 879394, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Chrysanthemum.jpg", "$$hashKey": "04J" }, { "name": "Lighthouse.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 24, "size": 561276, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Lighthouse.jpg", "$$hashKey": "04T" }, { "name": "Koala.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 25, "size": 780831, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Koala.jpg", "$$hashKey": "04X" }, { "name": "Penguins.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 26, "size": 777835, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Penguins.jpg", "$$hashKey": "04Y" }, { "name": "Tulips.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 27, "size": 620888, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Tulips.jpg", "$$hashKey": "055" }], "$$hashKey": "00X" }, { "name": "Annat kul", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 5, "children": [], "$$hashKey": "011" }, { "name": "Musik?", "type": "Folder", "img": "img/musicFolder.png", "checked": true, "id": 6, "children": [], "$$hashKey": "015" }, { "name": "Folder5", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 7, "children": [], "$$hashKey": "019" }, { "name": "Folder6", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 8, "children": [], "$$hashKey": "01D" }, { "name": "Folder7", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 9, "children": [], "$$hashKey": "01H" }, { "name": "Folder8", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 10, "children": [], "$$hashKey": "01L" }, { "name": "Folder9", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 11, "children": [], "$$hashKey": "01P" }, { "name": "Folder10", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 12, "children": [], "$$hashKey": "01T" }, { "name": "Folder11", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 13, "children": [], "$$hashKey": "01X" }, { "name": "Folder12", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 14, "children": [], "$$hashKey": "021" }, { "name": "Folder13", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 15, "children": [], "$$hashKey": "025" }, { "name": "Folder14", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 16, "children": [], "$$hashKey": "029" }, { "name": "Folder15", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 17, "children": [], "$$hashKey": "02D" }, { "name": "Folder16", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 18, "children": [], "$$hashKey": "02H" }, { "name": "Folder17", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 19, "children": [], "$$hashKey": "02L" }], "shareAccess": [{ "name": "About-face-3.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 28, "size": 10864588, "lastModified": "2014-04-10T09:04:04.000Z", "isImg": false, "thumb": null, "$$hashKey": "06O" }, { "name": "Exjobb_anvisning_2014.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 29, "size": 163235, "lastModified": "2014-03-28T08:24:13.000Z", "isImg": false, "thumb": null, "$$hashKey": "06S" }, { "name": "source.zip", "type": "", "img": "img/file.png", "checked": false, "id": 30, "size": 8980130, "lastModified": "2014-04-08T13:45:53.000Z", "isImg": false, "thumb": null, "$$hashKey": "06W" }, { "name": "WinSCP.ini", "type": "", "img": "img/file.png", "checked": false, "id": 31, "size": 13366, "lastModified": "2014-04-16T13:01:46.000Z", "isImg": false, "thumb": null, "$$hashKey": "070" }, { "name": "Dokument", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 3, "children": [{ "name": "About-face-3.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 28, "size": 10864588, "lastModified": "2014-04-10T09:04:04.000Z", "isImg": false, "thumb": null, "$$hashKey": "06O" }, { "name": "Exjobb_anvisning_2014.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 29, "size": 163235, "lastModified": "2014-03-28T08:24:13.000Z", "isImg": false, "thumb": null, "$$hashKey": "06S" }, { "name": "source.zip", "type": "", "img": "img/file.png", "checked": false, "id": 30, "size": 8980130, "lastModified": "2014-04-08T13:45:53.000Z", "isImg": false, "thumb": null, "$$hashKey": "06W" }, { "name": "WinSCP.ini", "type": "", "img": "img/file.png", "checked": false, "id": 31, "size": 13366, "lastModified": "2014-04-16T13:01:46.000Z", "isImg": false, "thumb": null, "$$hashKey": "070" }], "$$hashKey": "00T" }, { "name": "Hydrangeas.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 20, "size": 595284, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Hydrangeas.jpg", "$$hashKey": "04D" }, { "name": "Desert.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 21, "size": 845941, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Desert.jpg", "$$hashKey": "04H" }, { "name": "Jellyfish.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 22, "size": 775702, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Jellyfish.jpg", "$$hashKey": "04I" }, { "name": "Chrysanthemum.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 23, "size": 879394, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Chrysanthemum.jpg", "$$hashKey": "04J" }, { "name": "Lighthouse.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 24, "size": 561276, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Lighthouse.jpg", "$$hashKey": "04T" }, { "name": "Koala.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 25, "size": 780831, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Koala.jpg", "$$hashKey": "04X" }, { "name": "Penguins.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 26, "size": 777835, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Penguins.jpg", "$$hashKey": "04Y" }, { "name": "Tulips.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 27, "size": 620888, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Tulips.jpg", "$$hashKey": "055" }, { "name": "Bilder", "type": "Folder", "img": "img/picFolder.png", "checked": true, "id": 4, "children": [{ "name": "Hydrangeas.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 20, "size": 595284, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Hydrangeas.jpg", "$$hashKey": "04D" }, { "name": "Desert.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 21, "size": 845941, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Desert.jpg", "$$hashKey": "04H" }, { "name": "Jellyfish.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 22, "size": 775702, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Jellyfish.jpg", "$$hashKey": "04I" }, { "name": "Chrysanthemum.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 23, "size": 879394, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Chrysanthemum.jpg", "$$hashKey": "04J" }, { "name": "Lighthouse.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 24, "size": 561276, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Lighthouse.jpg", "$$hashKey": "04T" }, { "name": "Koala.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 25, "size": 780831, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Koala.jpg", "$$hashKey": "04X" }, { "name": "Penguins.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 26, "size": 777835, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Penguins.jpg", "$$hashKey": "04Y" }, { "name": "Tulips.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 27, "size": 620888, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Tulips.jpg", "$$hashKey": "055" }], "$$hashKey": "00X" }, { "name": "Annat kul", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 5, "children": [], "$$hashKey": "011" }, { "name": "Musik?", "type": "Folder", "img": "img/musicFolder.png", "checked": true, "id": 6, "children": [], "$$hashKey": "015" }, { "name": "Folder5", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 7, "children": [], "$$hashKey": "019" }, { "name": "Folder6", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 8, "children": [], "$$hashKey": "01D" }, { "name": "Folder7", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 9, "children": [], "$$hashKey": "01H" }, { "name": "Folder8", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 10, "children": [], "$$hashKey": "01L" }, { "name": "Folder9", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 11, "children": [], "$$hashKey": "01P" }, { "name": "Folder10", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 12, "children": [], "$$hashKey": "01T" }, { "name": "Folder11", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 13, "children": [], "$$hashKey": "01X" }, { "name": "Folder12", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 14, "children": [], "$$hashKey": "021" }, { "name": "Folder13", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 15, "children": [], "$$hashKey": "025" }, { "name": "Folder14", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 16, "children": [], "$$hashKey": "029" }, { "name": "Folder15", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 17, "children": [], "$$hashKey": "02D" }, { "name": "Folder16", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 18, "children": [], "$$hashKey": "02H" }, { "name": "Folder17", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 19, "children": [], "$$hashKey": "02L" }], "moveAccess": [{ "name": "About-face-3.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 28, "size": 10864588, "lastModified": "2014-04-10T09:04:04.000Z", "isImg": false, "thumb": null, "$$hashKey": "06O" }, { "name": "Exjobb_anvisning_2014.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 29, "size": 163235, "lastModified": "2014-03-28T08:24:13.000Z", "isImg": false, "thumb": null, "$$hashKey": "06S" }, { "name": "source.zip", "type": "", "img": "img/file.png", "checked": false, "id": 30, "size": 8980130, "lastModified": "2014-04-08T13:45:53.000Z", "isImg": false, "thumb": null, "$$hashKey": "06W" }, { "name": "WinSCP.ini", "type": "", "img": "img/file.png", "checked": false, "id": 31, "size": 13366, "lastModified": "2014-04-16T13:01:46.000Z", "isImg": false, "thumb": null, "$$hashKey": "070" }, { "name": "Dokument", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 3, "children": [{ "name": "About-face-3.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 28, "size": 10864588, "lastModified": "2014-04-10T09:04:04.000Z", "isImg": false, "thumb": null, "$$hashKey": "06O" }, { "name": "Exjobb_anvisning_2014.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 29, "size": 163235, "lastModified": "2014-03-28T08:24:13.000Z", "isImg": false, "thumb": null, "$$hashKey": "06S" }, { "name": "source.zip", "type": "", "img": "img/file.png", "checked": false, "id": 30, "size": 8980130, "lastModified": "2014-04-08T13:45:53.000Z", "isImg": false, "thumb": null, "$$hashKey": "06W" }, { "name": "WinSCP.ini", "type": "", "img": "img/file.png", "checked": false, "id": 31, "size": 13366, "lastModified": "2014-04-16T13:01:46.000Z", "isImg": false, "thumb": null, "$$hashKey": "070" }], "$$hashKey": "00T" }, { "name": "Hydrangeas.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 20, "size": 595284, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Hydrangeas.jpg", "$$hashKey": "04D" }, { "name": "Desert.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 21, "size": 845941, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Desert.jpg", "$$hashKey": "04H" }, { "name": "Jellyfish.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 22, "size": 775702, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Jellyfish.jpg", "$$hashKey": "04I" }, { "name": "Chrysanthemum.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 23, "size": 879394, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Chrysanthemum.jpg", "$$hashKey": "04J" }, { "name": "Lighthouse.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 24, "size": 561276, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Lighthouse.jpg", "$$hashKey": "04T" }, { "name": "Koala.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 25, "size": 780831, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Koala.jpg", "$$hashKey": "04X" }, { "name": "Penguins.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 26, "size": 777835, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Penguins.jpg", "$$hashKey": "04Y" }, { "name": "Tulips.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 27, "size": 620888, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Tulips.jpg", "$$hashKey": "055" }, { "name": "Bilder", "type": "Folder", "img": "img/picFolder.png", "checked": true, "id": 4, "children": [{ "name": "Hydrangeas.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 20, "size": 595284, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Hydrangeas.jpg", "$$hashKey": "04D" }, { "name": "Desert.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 21, "size": 845941, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Desert.jpg", "$$hashKey": "04H" }, { "name": "Jellyfish.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 22, "size": 775702, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Jellyfish.jpg", "$$hashKey": "04I" }, { "name": "Chrysanthemum.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 23, "size": 879394, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Chrysanthemum.jpg", "$$hashKey": "04J" }, { "name": "Lighthouse.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 24, "size": 561276, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Lighthouse.jpg", "$$hashKey": "04T" }, { "name": "Koala.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 25, "size": 780831, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Koala.jpg", "$$hashKey": "04X" }, { "name": "Penguins.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 26, "size": 777835, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Penguins.jpg", "$$hashKey": "04Y" }, { "name": "Tulips.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 27, "size": 620888, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Tulips.jpg", "$$hashKey": "055" }], "$$hashKey": "00X" }, { "name": "Annat kul", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 5, "children": [], "$$hashKey": "011" }, { "name": "Musik?", "type": "Folder", "img": "img/musicFolder.png", "checked": true, "id": 6, "children": [], "$$hashKey": "015" }, { "name": "Folder5", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 7, "children": [], "$$hashKey": "019" }, { "name": "Folder6", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 8, "children": [], "$$hashKey": "01D" }, { "name": "Folder7", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 9, "children": [], "$$hashKey": "01H" }, { "name": "Folder8", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 10, "children": [], "$$hashKey": "01L" }, { "name": "Folder9", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 11, "children": [], "$$hashKey": "01P" }, { "name": "Folder10", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 12, "children": [], "$$hashKey": "01T" }, { "name": "Folder11", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 13, "children": [], "$$hashKey": "01X" }, { "name": "Folder12", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 14, "children": [], "$$hashKey": "021" }, { "name": "Folder13", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 15, "children": [], "$$hashKey": "025" }, { "name": "Folder14", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 16, "children": [], "$$hashKey": "029" }, { "name": "Folder15", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 17, "children": [], "$$hashKey": "02D" }, { "name": "Folder16", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 18, "children": [], "$$hashKey": "02H" }, { "name": "Folder17", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 19, "children": [], "$$hashKey": "02L" }], "syncAccess": [{ "name": "About-face-3.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 28, "size": 10864588, "lastModified": "2014-04-10T09:04:04.000Z", "isImg": false, "thumb": null, "$$hashKey": "06O" }, { "name": "Exjobb_anvisning_2014.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 29, "size": 163235, "lastModified": "2014-03-28T08:24:13.000Z", "isImg": false, "thumb": null, "$$hashKey": "06S" }, { "name": "source.zip", "type": "", "img": "img/file.png", "checked": false, "id": 30, "size": 8980130, "lastModified": "2014-04-08T13:45:53.000Z", "isImg": false, "thumb": null, "$$hashKey": "06W" }, { "name": "WinSCP.ini", "type": "", "img": "img/file.png", "checked": false, "id": 31, "size": 13366, "lastModified": "2014-04-16T13:01:46.000Z", "isImg": false, "thumb": null, "$$hashKey": "070" }, { "name": "Dokument", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 3, "children": [{ "name": "About-face-3.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 28, "size": 10864588, "lastModified": "2014-04-10T09:04:04.000Z", "isImg": false, "thumb": null, "$$hashKey": "06O" }, { "name": "Exjobb_anvisning_2014.pdf", "type": "application/pdf", "img": "img/pdfFile.jpg", "checked": false, "id": 29, "size": 163235, "lastModified": "2014-03-28T08:24:13.000Z", "isImg": false, "thumb": null, "$$hashKey": "06S" }, { "name": "source.zip", "type": "", "img": "img/file.png", "checked": false, "id": 30, "size": 8980130, "lastModified": "2014-04-08T13:45:53.000Z", "isImg": false, "thumb": null, "$$hashKey": "06W" }, { "name": "WinSCP.ini", "type": "", "img": "img/file.png", "checked": false, "id": 31, "size": 13366, "lastModified": "2014-04-16T13:01:46.000Z", "isImg": false, "thumb": null, "$$hashKey": "070" }], "$$hashKey": "00T" }, { "name": "Hydrangeas.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 20, "size": 595284, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Hydrangeas.jpg", "$$hashKey": "04D" }, { "name": "Desert.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 21, "size": 845941, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Desert.jpg", "$$hashKey": "04H" }, { "name": "Jellyfish.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 22, "size": 775702, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Jellyfish.jpg", "$$hashKey": "04I" }, { "name": "Chrysanthemum.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 23, "size": 879394, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Chrysanthemum.jpg", "$$hashKey": "04J" }, { "name": "Lighthouse.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 24, "size": 561276, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Lighthouse.jpg", "$$hashKey": "04T" }, { "name": "Koala.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 25, "size": 780831, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Koala.jpg", "$$hashKey": "04X" }, { "name": "Penguins.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 26, "size": 777835, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Penguins.jpg", "$$hashKey": "04Y" }, { "name": "Tulips.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 27, "size": 620888, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Tulips.jpg", "$$hashKey": "055" }, { "name": "Bilder", "type": "Folder", "img": "img/picFolder.png", "checked": true, "id": 4, "children": [{ "name": "Hydrangeas.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 20, "size": 595284, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Hydrangeas.jpg", "$$hashKey": "04D" }, { "name": "Desert.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 21, "size": 845941, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Desert.jpg", "$$hashKey": "04H" }, { "name": "Jellyfish.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 22, "size": 775702, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Jellyfish.jpg", "$$hashKey": "04I" }, { "name": "Chrysanthemum.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 23, "size": 879394, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Chrysanthemum.jpg", "$$hashKey": "04J" }, { "name": "Lighthouse.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 24, "size": 561276, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Lighthouse.jpg", "$$hashKey": "04T" }, { "name": "Koala.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 25, "size": 780831, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Koala.jpg", "$$hashKey": "04X" }, { "name": "Penguins.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 26, "size": 777835, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Penguins.jpg", "$$hashKey": "04Y" }, { "name": "Tulips.jpg", "type": "image/jpeg", "img": "img/dbFile.png", "checked": false, "id": 27, "size": 620888, "lastModified": null, "isImg": true, "thumb": null, "origin": "Dropbox", "path": "/Exjobbsbilder/Tulips.jpg", "$$hashKey": "055" }], "$$hashKey": "00X" }, { "name": "Annat kul", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 5, "children": [], "$$hashKey": "011" }, { "name": "Musik?", "type": "Folder", "img": "img/musicFolder.png", "checked": true, "id": 6, "children": [], "$$hashKey": "015" }, { "name": "Folder5", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 7, "children": [], "$$hashKey": "019" }, { "name": "Folder6", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 8, "children": [], "$$hashKey": "01D" }, { "name": "Folder7", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 9, "children": [], "$$hashKey": "01H" }, { "name": "Folder8", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 10, "children": [], "$$hashKey": "01L" }, { "name": "Folder9", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 11, "children": [], "$$hashKey": "01P" }, { "name": "Folder10", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 12, "children": [], "$$hashKey": "01T" }, { "name": "Folder11", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 13, "children": [], "$$hashKey": "01X" }, { "name": "Folder12", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 14, "children": [], "$$hashKey": "021" }, { "name": "Folder13", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 15, "children": [], "$$hashKey": "025" }, { "name": "Folder14", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 16, "children": [], "$$hashKey": "029" }, { "name": "Folder15", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 17, "children": [], "$$hashKey": "02D" }, { "name": "Folder16", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 18, "children": [], "$$hashKey": "02H" }, { "name": "Folder17", "type": "Folder", "img": "img/folder.png", "checked": true, "id": 19, "children": [], "$$hashKey": "02L" }], "$$hashKey": "00E" }, { "name": "Svenne", "checked": false, "noViewAccess": true, "viewAccess": [], "shareAccess": [], "moveAccess": [], "syncAccess": [], "$$hashKey": "00F" }, { "name": "Kalle", "checked": false, "noViewAccess": true, "viewAccess": [], "shareAccess": [], "moveAccess": [], "syncAccess": [], "$$hashKey": "00G" }];
	init($scope.savedSettings, $scope.folder, $scope.savedPeople);
	$scope.favAdded = false;
	$scope.favFolder;

	/*
	*
	*/
	$scope.isSelectMode = false;
	$scope.selectMode = function () {
		$scope.isSelectMode = !$scope.isSelectMode;
		if (!$scope.isSelectMode) {
			$scope.uncheckFolders($scope.settings.currentFolder);
		}
	}
	
	$scope.select = function (f) {
		$scope.checkFolders(f)
	}
	
	$scope.favorite = function()
	{
		//Add favorite folder
		if(!$scope.favAdded)
		{
			console.log($scope.settings.rootF);
			$scope.favFolder = new Folder("Favorites");
			$scope.favFolder.img = 'img/favFolder.png'
			$scope.favAdded = true;
			$scope.settings.rootF.add($scope.favFolder);
			var user = 0;
			$scope.persons[user]['syncAccess'].push($scope.favFolder);
			$scope.persons[user]['viewAccess'].push($scope.favFolder);
		}
		var current = $scope.settings.currentFolder;
		addFavFolders(current);
	}
	
	$scope.unFavorite = function()
	{	
		var i=0;
		while(i<$scope.favFolder.children.length)
		{
			if($scope.favFolder.children[i].checked)
			{
				$scope.favFolder.remove($scope.favFolder.children[i]);
			}
			else
			{
				i++;
			}
		}
	}
	
	var addFavFolders = function(cur)
	{
		for(var i=0;i<cur.children.length;i++)
		{
			if(cur.children[i].checked)
			{
				if(cur.children[i].type === 'Folder')
				{
					var fav = new Folder(cur.children[i].name);
					fav.img = $scope.settings.folderIcon;
					fav.children = cur.children[i].children;
					fav.Parent = cur.children[i].Parent;
					$scope.favFolder.add(fav);
					var user = 0;
					$scope.persons[user]['syncAccess'].push(fav);
					$scope.persons[user]['viewAccess'].push(fav);
				}
				else
				{
					var fav = cur.children[i];
					$scope.favFolder.add(fav);
					var user = 0;
					$scope.persons[user]['syncAccess'].push(fav);
					$scope.persons[user]['viewAccess'].push(fav);
				}
			}
			else
			{	
				if(cur.children[i].type === 'Folder')
				{
					addFavFolders(cur.children[i]);
				}
			}
		}
	}
	$scope.filterAccess = function (access) {
		return function (node) {
			var scope = angular.element($("#ng")).scope();

			for (var i = 0, persons = scope.persons; i < persons.length; i++) {
				
				for (var j = 0; j < persons[i][access].length; j++)
					if (persons[i][access][j].id === node.id) {
						return true;
					}
			}
			if(node.name === 'Favorites')
			{
				return true;
			}
			return false;
		}
	}
	$scope.share = function (node) {
		if (node.type === 'Folder') {
			for (var i = 0; i < node.children.length; i++) {

				$scope.share(node.children[i]);

				if (node.children[i].checked) {
					if (hasAccess(node.children[i], 'shareAccess')) {
						//Make share call here TODO
						//or save to array or smt
						console.log(node.children[i].name + ' shared');
					}
					else {
						console.log('You don\'t have permission to share '+ node.children[i].name);
					}
				}
			}
		}
	}
	$scope.sync = function(node){
		var answer = confirm('Do you want to sync ' + node.name + '?');
		if (answer) {
			var user = 0;
			$scope.persons[user]['syncAccess'].push(node);
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
    contentPanel[0].style.height = getHeight() - 61 + 'px';
    contentPanel[1].style.height = getHeight() - 61 + 'px';
    var contentPanel = document.getElementsByClassName("panel-default");
    contentPanel[0].style.width = getWidth() + 'px';
    contentPanel[1].style.width = getWidth() + 'px';

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




