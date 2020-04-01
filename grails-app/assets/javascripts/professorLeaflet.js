var nodes = [];
var links = [];
var leafletLinks = [];
var leafletNodes = [];
var algorithm
var blackIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    iconAnchor: [12, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

    shadowSize: [41, 41]
});

$(document).ready(function() {
    //load Nodes
    $.ajax({
        url: "/node/queryNodes",
        dataType: 'json',
        success: function (data) {
            data.forEach(function(row){
                nodes.push([parseFloat(row.xCoord),parseFloat(row.yCoord)])
            });
            getLinks()
        }
    })
});
function getLinks(){
    //load Links
    $.ajax({
        url: "/link/queryLinks",
        dataType: 'json',
        success: function (data) {
            data.forEach(function(row){
                links.push([row.linkLength, row.numLanes, row.capacity, row.freeFlowTravelTime, row.alpha, row.beta, row.aParam, row.bParam,
                    row.cParam,row.uNodeID, row.dNodeID, row.carsOnLink])
            });

            getAlgorithm()
        }
    });
}
function getAlgorithm(){
    //loadAlgorithm
    $.ajax({
        url: "/StudentTurn/getAlgorithm",
        type:'GET',
        dataType: 'json',
        success: function (data) {
            algorithm = data.algorithm
            console.log(data.algorithm)
            loadNetwork()
        }
    });

}

function loadNetwork(){
    //set up view of centered on houghton, using street map
    var startLatLng = L.latLng(47.117432,-88.558785)
    var mymap = L.map('map').setView(startLatLng, 14);
    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 13,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    for (let step = 0; step < nodes.length; step++) {
        leafletNodes.push(L.marker(L.latLng(nodes[step][1],nodes[step][0]), {icon:blackIcon}).addTo(mymap));
    }

    for (let step = 0; step < links.length; step++) {
        var path = [[nodes[links[step][9] - 1][1], nodes[links[step][9] - 1][0]], [nodes[links[step][10] - 1][1], nodes[links[step][10] - 1][0]]];
        leafletLinks.push(L.polyline(path, {color: 'black', weight: 10}).addTo(mymap));
        let weight = 0;
        if (algorithm == "BPR")
            weight = BPR(links[step][3], links[step][11], links[step][2], links[step][4], links[step][5]);
        else {
            weight = PCF(links[step][6], links[step][7], links[step][8], links[step][11]);
        }
        leafletLinks[step].bindTooltip("" + weight, {permanent: true, direction: "center"}).openTooltip();
        if (links[step][3] == 1) {
            L.polylineDecorator(leafletLinks[step], {
                patterns: [
                    // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                    {
                        offset: '12%',
                        repeat: '20%',
                        symbol: L.Symbol.arrowHead({
                            pixelSize: 15,
                            polygon: false,
                            pathOptions: {color: "yellow", stroke: true}
                        })
                    }
                ]
            }).addTo(mymap);
        }
    }
}

function refreshPage(){
    window.location.reload();
}
//xa number of cars on the path

function BPR(ta, xa, ca, alpha, beta){
    return ta * (1 + (alpha * Math.pow(( xa / ca), beta)));
}

function PCF(A, B, C, xa){
    return C * Math.pow(xa, 2) + (B * xa) + A;
}