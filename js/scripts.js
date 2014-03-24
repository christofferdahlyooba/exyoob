$(function () {
    $("#resizable").resizable({
        maxHeight: 600,
        maxWidth: 748,
        minHeight: 100,
        minWidth: 140,
        alsoResize: '.contentpanel2',
        resize: function (event, ui) {
            updateHeight(ui.size.height);
            saveNewSize(ui.size.width, ui.size.height);
        }
    });
});

//Toggle button for showing folder names
$("[name='showFolderName']").bootstrapSwitch();

$('#showFolderName').on('switchChange', function (e, data) {
    var $element = $(data.el),
        value = data.value;
    var scope = angular.element($("#ng")).scope();
    scope.$apply(function () {
        scope.settings.showFont = !scope.settings.showFont;
    });
    setTimeout(togglePlaceHolders());
});

//Toggle button for showing thumbnails
$("[name='showThumb']").bootstrapSwitch();

$('#showThumb').on('switchChange', function (e, data) {
    var $element = $(data.el),
        value = data.value;
    var scope = angular.element($("#ng")).scope();
    scope.$apply(function () {
        scope.settings.showThumb = !scope.settings.showThumb;
    });
});


//Toggle button for horizontal or vertical scrolling
$("[name='scrollingBox']").bootstrapSwitch();

$('#scrollingBox').on('switchChange', function (e, data) {
    var $element = $(data.el),
      value = data.value;
    var scope = angular.element($("#ng")).scope();
    scope.$apply(function () {
        scope.settings.cols = !scope.settings.cols;
        changeScrollDir(scope.settings.cols);
    });
    setTimeout(togglePlaceHolders());
});