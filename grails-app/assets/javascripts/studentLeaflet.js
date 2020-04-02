var nodes = [];
var links = [];
var start = null;
var end = null;
var currentIcon = null;
var leafletLinks = [];
var leafletNodes = [];
var orderNodesPicked = [];
var orderLinksPicked = [];
var lastNode= [];
var lastLink= [];
var algorithm = "d"
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
    //load Nodes
    $.ajax({
        url: "/node/queryNodes",
        dataType: 'json',
        success: function (data) {
            data.forEach(function(row){
                nodes.push(row)
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
                links.push(row)
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
            previousTurn()
        }
    });

}
function previousTurn(){
    //loadPreviousTurn
    $.ajax({
        url: "/StudentTurn/getLastTurn",
        type:'Post',
        dataType: 'json',
        data: "value="+JSON.stringify({user: localStorage.getItem("username")}),
        success: function (data) {
            lastNode = data.lastNodePath
            lastLink = data.lastLinkPath
            loadNetwork()
        }
    });
}

function loadNetwork(){
    start = 0;
    currentIcon = 0
    end = 2;
    orderNodesPicked.push(start);

    //set up view of centered on houghton, using street map
    var startLatLng = L.latLng(47.117432,-88.558785)
    var mymap = L.map('map').setView(startLatLng, 14);
    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 13,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    for (let step = 0; step < nodes.length; step++) {
        var marker = null;
        if(step == start){
            leafletNodes.push(L.marker(L.latLng(nodes[step].yCoord,nodes[step].xCoord), {icon:greenIcon}).addTo(mymap));
        }
        else if(step == end){
            leafletNodes.push(L.marker(L.latLng(nodes[step].yCoord,nodes[step].xCoord), {icon:redIcon}).addTo(mymap));
        }
        else{
            leafletNodes.push(L.marker(L.latLng(nodes[step].yCoord,nodes[step].xCoord), {icon:blackIcon}).addTo(mymap));
        }
        leafletNodes[step].on('click',function(){
            selectRoute(step);
        });
    }

    for (let step = 0; step < links.length; step++){
        var path = [[nodes[links[step].uNodeID - 1].yCoord, nodes[links[step].uNodeID - 1].xCoord], [nodes[links[step].dNodeID - 1].yCoord,nodes[links[step].dNodeID - 1].xCoord]];
        leafletLinks.push(L.polyline(path, {color: 'black',weight:10}).addTo(mymap));
        let weight = 0;
        if(algorithm == "BPR")
            weight = BPR(links[step].freeFlowTravelTime, links[step].carsOnLink, links[step].capacity, links[step].alpha, links[step].beta);
        else{
            weight = PCF(links[step].aParam, links[step].bParam, links[step].cParam, links[step].carsOnLink);
        }
        leafletLinks[step].bindTooltip(""+weight, {permanent: true, direction:"center"}).openTooltip();
        L.polylineDecorator(leafletLinks[step],{
            patterns: [
                // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                {offset: '12%', repeat: '20%', symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {color:"yellow",stroke: true}})}
            ]
        }).addTo(mymap);

    }
}

//send choices to update choices and update congestion
function endTurn(){
    $.ajax({
        url: "/StudentTurn/addTurn",
        type:'POST',
        dataType: 'json',
        data: "value="+JSON.stringify({user: localStorage.getItem("username"), pathNode: orderNodesPicked,pathLink: orderLinksPicked, lastNodePath:lastNode, lastLinkPath:lastLink }),
    });
}

function refreshPage(){
    window.location.reload();
}

function selectRoute(icon){
    if(orderNodesPicked.includes(icon)){
        var cutoff = -1;
        for(let step = 0; step < orderNodesPicked.length; step++){
            if (orderNodesPicked[step] == icon){
                cutoff = step;
            }
            else if(cutoff != -1){

                leafletLinks[orderLinksPicked[step]].setStyle({
                    color:'black'
                });
                if(orderNodesPicked[step] == end){
                    leafletNodes[orderNodesPicked[step]].setIcon(redIcon);
                }
                else{
                    leafletNodes[orderNodesPicked[step]].setIcon(blackIcon);
                }
            }
        }
        orderLinksPicked = orderLinksPicked.slice(0,cutoff);
        orderNodesPicked = orderNodesPicked.slice(0,cutoff+1);
        currentIcon = icon;
    }
    else{
        for (let step = 0; step < links.length; step++){
            if(links[step].uNodeID-1 == currentIcon && links[step].dNodeID-1 == icon){

                leafletLinks[step].setStyle({
                    color:'green'
                });
                orderLinksPicked.push(step);

                leafletNodes[icon].setIcon(greenIcon);
                orderNodesPicked.push(icon);
                currentIcon = icon;
                break;
            }
        }
    }
}

//xa number of cars on the path

function BPR(ta, xa, ca, alpha, beta){
    return ta * (1 + (alpha * Math.pow(( xa / ca), beta)));
}

function PCF(A, B, C, xa){
    return C * Math.pow(xa, 2) + (B * xa) + A;
}