'Use strict';

let latitude;
let longitude;
const latMin = 42.739;
const latMax = 45.0065;
const lonMin = -71.5489;
const lonMax = -73.3654;
var mymap = L.map('map').setView([43.873, -72.45715], 8);
let vermontBorder = L.geoJson(border_data);
let marker

initialize();

function initialize() {
    mymap.setView([43.873, -72.45715], 8);
    vermontBorder.addTo(mymap)
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
    getLatLon()
}

function quitGame(){
    initialize();
    marker.remove();
}

function getLatLon(){
    latitude = getRandomNum(latMin,latMax)
    longitude = getRandomNum(lonMin,lonMax)
    let results = leafletPip.pointInLayer([longitude, latitude], vermontBorder);

    console.log({results});

    if(results.length === 0){
        getLatLon()
    } else {
    setMap() 
    }  
}

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  }

function setMap(){
    vermontBorder.remove();
    mymap.setView([latitude,longitude],15);
    marker = L.marker([latitude,longitude]).addTo(mymap).bindPopup("Which County Am I In?").openPopup();
}




