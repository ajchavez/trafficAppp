var nodes = [null];
var links = [null];
var leafletLinks = [null];
var leafletNodes = [null];
var settings = null;

var blackIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    iconAnchor: [12, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

    shadowSize: [41, 41]
});
var greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    iconAnchor: [12, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

    shadowSize: [41, 41]
});
var redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    iconAnchor: [12, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

    shadowSize: [41, 41]
});

$(document).ready(function() {
    $.when(getSettings()).done(function(a1){
        $.when(getLinks(),getNodes()).done(function(a1){
            loadNetwork()
        })
    })
});
function getSettings(){
    //load settings
    return $.ajax({
        url: "/StudentTurn/getSettings",
        type:'POST',
        dataType: 'json',
        data: "value="+JSON.stringify({gameCode: localStorage.getItem("gameCode")}),
        success: function (data) {
            console.log(data)
            settings = data
        }
    });
}
function getNodes(){
    //load Nodes
    return $.ajax({
        url: "/node/queryNodes",
        type:'POST',
        dataType: 'json',
        data: "value="+JSON.stringify({network: settings.network}),
        success: function (data) {
            data.forEach(function(row){
                nodes.push(row);
            });
        }
    })
};
function getLinks(){
    //load Links
    return $.ajax({
        url: "/link/queryLinks",
        type:'POST',
        dataType: 'json',
        data: "value="+JSON.stringify({network: settings.network}),
        success: function (data) {
            data.forEach(function(row){
                links.push(row)
            });

        }
    });
}

function loadNetwork(){
    //set up view of centered on network using first node
    var startLatLng = L.latLng(nodes[1].yCoord,nodes[1].xCoord)
    var mymap = L.map('map').setView(startLatLng, 14);
    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    console.log("Start node printing");
    for (let step = 1; step < nodes.length; step++) {
        // Add node to graph by it's nodeID and give it a label for logging purposes
        leafletNodes.push(L.marker(L.latLng(nodes[step].yCoord,nodes[step].xCoord)));
    }

    console.log("\nStart link printing");

    for (let step = 1; step < links.length; step++){
        var path = [[nodes[links[step].uNodeID].yCoord, nodes[links[step].uNodeID].xCoord], [nodes[links[step].dNodeID].yCoord,nodes[links[step].dNodeID].xCoord]];
        leafletLinks.push(L.polyline(path, {color: 'black',weight:10}).addTo(mymap));
        let weight = 0;
        if(settings.algorithm == "BPR")
            weight = BPR(links[step].freeFlowTravelTime, links[step].carsOnLink, links[step].capacity, links[step].alpha, links[step].beta);
        else{
            weight = PCF(links[step].aParam, links[step].bParam, links[step].cParam, links[step].carsOnLink);
        }

        // Add links to the graph
        // in order to assign a weight to an edge using graphlib just set it's label to
        // what you want it's weight to be, which is just the third argument to setEdge()
        console.log("uNode: " + links[step].uNodeID + " dNode: " + links[step].dNodeID);

        leafletLinks[step].bindTooltip(""+weight, {permanent: true, direction:"center"}).openTooltip();
        L.polylineDecorator(leafletLinks[step],{
            patterns: [
                // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                {offset: '12%', repeat: '20%', symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {color:"yellow",stroke: true}})}
            ]
        }).addTo(mymap);
    }

    getCurrentTurn()
}
function getCurrentTurn(){
    var currentTurn = null
    $.ajax({
        url: "/StudentTurn/getTurnNumber",
        type:'POST',
        dataType: 'text',
        data: "value="+JSON.stringify({gameCode: localStorage.getItem("gameCode")}),
        success: function (data) {
            if (currentTurn != null && currentTurn != data) {
                refreshPage()
            }
            setTimeout(getCurrentTurn(), 5000)
            currentTurn = data
        }
    });
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