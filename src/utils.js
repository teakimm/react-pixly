import cities from "cities";
import ExifReader from "exifreader";

function getStateByCoord(lat, latRef, long, longRef) {
  if (latRef === 'South latitude') lat *= -1;
  if (longRef === 'West longitude') long *= -1;

  return cities.gps_lookup(lat, long).state;
}

async function getEXIF(imagePath) {
  return await ExifReader.load(imagePath);
}

// https://stackoverflow.com/questions/13990673/upload-canvas-data-to-s3
function dataURItoBlob(dataURI) {
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for(var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

export {getStateByCoord, getEXIF, dataURItoBlob}