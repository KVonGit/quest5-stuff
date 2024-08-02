var questImagePath = "";

setImagePath = function(path) {
  questImagePath = path;
};

getFileUrlJS = function(filename){
  if(filename.indexOf("://") > 0) {
	return (filename);
  } else {
	return questImagePath.replace("_FILENAME_", filename);
  }
};
var imagesToCheck = [];

function checkImages(){
	imagesToCheck.forEach(function(img){
		isFileGood(img)
	});
};

var failedImgs = [];

function imgFail(imgFailed){
	failedImgs.push(imgFailed.src);
};

function isFileGood(url){
	imgFile = getFileUrlJS(url);
	$('body').append("<img style='display:none' /*onload='addToMap()'*/ onerror='imgFail(this)' src='"+imgFile+"'/>");
};

customDrawImage = function(url){
	var imgFile = getFileUrlJS(url);
	var failnumber = failedImgs.indexOf(imgFile);
	if(failnumber === -1){
		ASLEvent('AslSet', roomImageId.replace("-",".").replace("grid-image","grid_image")+"="+imgFile);
		gridApi.drawCustomLayerImage(roomImageId, imgFile, parseFloat(gridX), parseFloat(gridY), parseInt(roomGridWidth), parseInt(roomGridHeight));
	}
};