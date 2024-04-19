import cities from "cities";
import ExifReader from "exifreader";
import moment from "moment";

/** Takes lat (number), latRef (string), long, longRef.
 * Returns state from given coordinate.
 */
function getStateByCoord(lat, latRef, long, longRef) {
  if (latRef === 'South latitude') lat *= -1;
  if (longRef === 'West longitude') long *= -1;

  return cities.gps_lookup(lat, long).state;
}

/** Returns exif data of image at given image path. */
async function getEXIF(imagePath) {
  return await ExifReader.load(imagePath);
}

/** Takes dataURI and returns as blob.
 *
 * from
 * https://stackoverflow.com/questions/13990673/upload-canvas-data-to-s3
 */

function dataURItoBlob(dataURI) {
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}

/** Takes time string.
 * If more than twelve hours has elapsed, return date in LL format.
 * Else, time passed from function call.
 */
function formatTime(time) {
  const twelveHours = 43200;
  console.log(time);
  const timeDiff = (new Date() - new Date(time)) / 1000;
  const relTime = moment(time).fromNow();
  return timeDiff > twelveHours
    ? moment(time).format("LL")
    : relTime;
}

/** adjust an images size to have a maximum width/height of 700, and maintain
 * aspect ratio
 */
function resizeImage(width, height) {
  const maxWidth = 700;
  const maxHeight = 700;
  if (width > maxWidth || height > maxHeight) {
    const aspectRatio = width / height;
    if (width > height) {
      width = maxWidth;
      height = width / aspectRatio;
    } else {
      height = maxHeight;
      width = height * aspectRatio;
    }
  }
  return ({ width, height });
}

export { getStateByCoord, getEXIF, dataURItoBlob, formatTime, resizeImage };