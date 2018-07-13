'Use strict';

let latitude;
let longitude;
let marker
let score;
const latMin = 42.739;
const latMax = 45.0065;
const lonMin = -71.5489;
const lonMax = -73.3654;
var mymap = L.map('map').setView([43.873, -72.45715], 8);
let vermontBorder = L.geoJson(border_data);



document.getElementById('score').textContent = score;

initialize();

function initialize() {
    $('.leaflet-control-attribution').hide()
    $('img').hide();
    mymap.setView([43.873, -72.45715], 8);
    vermontBorder.addTo(mymap)
    score = 20;
    document.getElementById('start').disabled=false;
    document.getElementById('guess').disabled=true;
    document.getElementById('quit').disabled=true;
    mymap.touchZoom.disable();
    mymap.doubleClickZoom.disable();
    mymap.scrollWheelZoom.disable();
    mymap.boxZoom.disable();
    mymap.keyboard.disable();
    mymap.dragging.disable();
    mymap.zoomControl.disable();
   
}
// Code below is for 'easy mode'
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibG9yZWFuZGVyIiwiYSI6ImNqamV5aHI1cDRzYXkza29nZWYybW4xYXQifQ.klGOVR3KOTtMXsr5bDGorA'
// , {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'your.mapbox.access.token'
// }).addTo(mymap);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(mymap);


function startGame(){
    document.getElementById('start').disabled=true;
    document.getElementById('guess').disabled=false;
    document.getElementById('quit').disabled=false;
    $('img').show();
    if(marker != undefined){
        marker.remove();
    }
    getLatLon()
}

function quitGame(){
    initialize();
    getCounty();
}

function displayInfo(mapInfo) {
    document.getElementById('latValue').textContent = latitude.toString().slice(0,7)
    document.getElementById('lonValue').textContent = longitude.toString().slice(0,8)
    document.getElementById('countyValue').textContent = mapInfo.address.county.slice(0,-7)
    document.getElementById('townValue').textContent = mapInfo.address.town
}

function getCounty() {
    fetch('https://nominatim.openstreetmaps.org/reverse/?format=json&lat=' + latitude + '&lon=' + longitude)
       .then(function (response) {
           return response.json();
       })
       .then(function (mapInfo) {
           displayInfo(mapInfo)
       })
}

function getLatLon(){
    latitude = getRandomNum(latMin,latMax)
    longitude = getRandomNum(lonMin,lonMax)
    let results = leafletPip.pointInLayer([longitude, latitude], vermontBorder);

    if(results.length === 0){
        getLatLon()
    } else {
    setMap()
    placemarker()
    }  
}

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  }

function setMap(){
    vermontBorder.remove();
    mymap.setView([latitude,longitude],15);
}

function placemarker() {
    marker = L.marker([latitude,longitude]).addTo(mymap).bindPopup("Which County Am I In?").openPopup();
}

function decreaseScore(){
    score -= 1;
    setScore();
}

function setScore() {
    document.getElementById("score").textContent = score;
}

function moveRight(){
    decreaseScore();
    longitude += .04;
    setMap();
}

function moveLeft() {
    decreaseScore();
    longitude -= .04;
    setMap()
}

function moveDown() {
    decreaseScore();
    latitude -= .024;
    setMap()
}

function moveUp() {
    decreaseScore();
    latitude += .024;
    setMap()
}

