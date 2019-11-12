//--Quick map to guide you home

//--My variables
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
  zoom: 5,
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
  image(millennium, spaceLanding.x - 75 + random(-3, 3), spaceLanding.y - 75 + random(-3, 3), 150, 150);

  var planet = myMap.latLngToPixel(hoth.lat, hoth.lng);
  image(r2d2, planet.x - 75 + random(-3, 3), planet.y - 75 + random(-3, 3), 150, 150);

  //--Text connected to the current location
  push();
  fill("black");
  textSize(20);
  stroke("aquamarine");
  strokeWeight(5);
  textAlign(CENTER);
  translate(60, 0);
  text("Chewie, we ain't home", spaceLanding.x - 75, spaceLanding.y + 95);
  text("Prepare for the Hyperspace Jump 'till ", spaceLanding.x - 75, spaceLanding.y + 115);
  textSize(40);
  text(distanceShort + 'km', spaceLanding.x - 75, spaceLanding.y + 155);
  pop();

  //--Title
  push();
  fill("black");
  textSize(70);
  stroke("aquamarine");
  strokeWeight(10);
  text('The Road Home (with Chewie)', 100, 100);
  pop();
}
