//Latitude Longitude
function initMap(){
    var mymap = L.map('map').setView([38.2527, -85.7585], 13);
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, attribution: osmAttrib}).addTo(mymap);

    $.getJSON("../data/secondtry.json", (data) =>{
        var layer = L.geoJSON(data).addTo(mymap);
    });
    //change

}
