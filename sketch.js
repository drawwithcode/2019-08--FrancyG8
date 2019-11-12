//--Quick map to guide you home

//--My Map
var myMap;
var youAreHere;
var canvas;
var distance;
var mappa = new Mappa("MapboxGL", "pk.eyJ1IjoiZnJhbmN5Z3JhbnoiLCJhIjoiY2sybTVkeDh4MGE1cDNvbzJqazl1dGpydyJ9.tvlvlGF9Y1sxG_tSpArnew");

//--Hoth (your destination)
var hoth = {
  lat: 45.85811,
  lng: 12.25290,
};

//--My Map Style
var options = {
  lat: 45,
  lng: 10,
  zoom: 6,
  style: "mapbox://styles/francygranz/ck2vyoguf09q81coab8n40a0a"
};


function preload() {
  //--Loading my external material
  youAreHere = getCurrentPosition();
  millennium = loadImage('./assets/millennium.png');
  r2d2 = loadImage('./assets/r2d2.png');
}


function setup() {
  //--Defining my canvas and my map
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  //--Defining my geo variables
  options.lat = youAreHere.latitude;
  options.lng = youAreHere.longitude;
}


function draw() {
  clear();

  //--Defining my variables of the two places and the distance between them
  var distance = calcGeoDistance(youAreHere.latitude, youAreHere.longitude, hoth.lat, hoth.lng);
  distanceShort = Math.round(distance * 100) / 100;

  var spaceLanding = myMap.latLngToPixel(youAreHere.latitude, youAreHere.longitude);
  image(millennium, spaceLanding.x + random(-5, 5), spaceLanding.y + random(-5, 5), 100, 100);

  var planet = myMap.latLngToPixel(hoth.lat, hoth.lng);
  image(r2d2, planet.x + random(-5, 5), planet.y + random(-5, 5), 100, 100);

  //--Text connected to the current location
  push();
  fill("black");
  textSize(50);
  stroke("aquamarine");
  strokeWeight(5);
  textAlign(CENTER);
  translate(150, 0);
  text("Chewie, we ain't home", spaceLanding.x, spaceLanding.y + 350);
  text("Prepare for the Hyperspace Jump 'till ", spaceLanding.x, spaceLanding.y + 400);
  textSize(100);
  text(distanceShort + 'km', spaceLanding.x, spaceLanding.y + 500);
  pop();

  //--Title
  push();
  fill("black");
  textSize(100);
  stroke("aquamarine");
  strokeWeight(10);
  text('The Road Home (with Chewie)', 100, 100);
  pop();

}
