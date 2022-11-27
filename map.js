function createMap() {
    
    var map = L.map('map').setView([41.8781, -87.6298], 14);
    mapLink = 
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
        }).addTo(map);

    
    for (var i = 0; i < coords.length; i++) {
        marker = new L.marker([coords[i][0],coords[i][1]])
            .addTo(map);
    }
}

function init() {
    createMap();
}

window.onload = init;