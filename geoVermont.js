'Use strict';

let latitude;
let longitude;
let marker
let score;
var mymap = L.map('map').setView([43.873, -72.45715], 8);;

const vermontBorder = L.geoJson(border_data);

initialize();


function initialize() {
    mymap.setView([43.873, -72.45715], 8);
    $('.leaflet-control-attribution').hide()
    $('img').hide();
    vermontBorder.addTo(mymap)
    score = 20;
    document.getElementById('score').textContent = score;
    buttonState('start', false)
    buttonState('guess', true)
    buttonState('quit', true)
    mymap.touchZoom.disable();
    mymap.doubleClickZoom.disable();
    mymap.scrollWheelZoom.disable();
    mymap.boxZoom.disable();
    mymap.keyboard.disable();
    mymap.dragging.disable();
    mymap.zoomControl.disable();
}


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibG9yZWFuZGVyIiwiYSI6ImNqamV5aHI1cDRzYXkza29nZWYybW4xYXQifQ.klGOVR3KOTtMXsr5bDGorA'
, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

function buttonState(button, state){
    document.getElementById(button).disabled=state;
}

function startGame(){
    buttonState('start', true)
    buttonState('guess', false)
    buttonState('quit', false)
    $('img').show();
    if(marker != undefined){
        marker.remove();
    }

    getLatLon()
    fetchMapInfo((mapInfo)=>{mapInfo=mapInfo})
}

function quitGame(){
    initialize();
    fetchMapInfo((mapInfo) => { displayInfo(mapInfo); });
}

function displayInfo(mapInfo) {
    document.getElementById('latValue').textContent = latitude.toString().slice(0,7)
    document.getElementById('lonValue').textContent = longitude.toString().slice(0,8)
    document.getElementById('countyValue').textContent = mapInfo.address.county.slice(0,-7)
}

function fetchMapInfo(callback) {
    fetch('https://nominatim.openstreetmaps.org/reverse/?format=json&lat=' + latitude + '&lon=' + longitude)
       .then(function (response) {
           return response.json();
       })
       .then(function (mapInfo) {
           if (callback) {
              callback(mapInfo)
           }
       })
}

function getLatLon(){
    const latMin = 42.739;
    const latMax = 45.0065;
    const lonMin = -71.5489;
    const lonMax = -73.3654;
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


function decreaseScore(subtractAmount){
    score -= subtractAmount;
    setScore();
    $("#score").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function setScore() {
    document.getElementById("score").textContent = score;
}

function moveRight(){
    decreaseScore(1);
    longitude += .04;
    setMap();
}

function moveLeft() {
    decreaseScore(1);
    longitude -= .04;
    setMap()
}

function moveDown() {
    decreaseScore(1);
    latitude -= .024;
    setMap()
}

function moveUp() {
    decreaseScore(1);
    latitude += .024;
    setMap()
}

