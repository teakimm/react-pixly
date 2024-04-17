import cities from "cities";

function getStateByCoord(lat, latRef, long, longRef) {
  if (latRef === 'South latitude') lat *= -1;
  if (longRef === 'West longitude') long *= -1;

  return cities.gps_lookup(lat, long).state;
}

export {getStateByCoord}