var nodes = [];
var links = null;
var start = null;
var end = null;
var currentIcon = null;
var leafletLinks = [];
var leafletNodes = [];
var orderNodesPicked = [];
var orderLinksPicked = [];

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

function saveNodes(arr){
    var temp = arr.split("/");
    for(let step = 0; step < temp.length - 1 ; step++) {
        var coords = temp[step].split(",");
        nodes.push([parseFloat(coords[0]), parseFloat(coords[1])]);
    }
}
$(document).ready(function() {
    $.ajax({
        url: "/node/queryNodes",//"${g.link (controller:'Node', action: 'queryNodes')}"
        dataType: "text",
        success: function (data) {
            saveNodes(data);
            loadNetwork();
        }
    })
    // $.ajax({
    //     url:"/node/queryNodes",//"${g.link (controller:'Node', action: 'queryNodes')}"
    //     dataType:"json",
    //     success:function(data){
    //         console.log(data[0]);
    //         return data;
    //     }
    // })
});

function loadNetwork(){
    links = [
        [1,1,4,1,0.15,4,0,0,1,0,3],
        [1,1,4,1,0.15,4,0,0,1,0,4],
        [1,1,4,1,0.15,4,0,0,0,3,2],
        [1,1,4,1,0.15,4,1,0,0,4,2],
        [1,1,4,1,0.15,4,0,0,0,3,1],
        [1,1,4,1,0.15,4,0,0,0,4,1]
    ];
    start = 0;
    currentIcon = 0
    end = 2;
    orderNodesPicked.push(start);
    orderLinksPicked.push(-1);
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
            leafletNodes.push(L.marker(L.latLng(nodes[step][1],nodes[step][0]), {icon:greenIcon}).addTo(mymap));
        }
        else if(step == end){
            leafletNodes.push(L.marker(L.latLng(nodes[step][1],nodes[step][0]), {icon:redIcon}).addTo(mymap));
        }
        else{
            leafletNodes.push(L.marker(L.latLng(nodes[step][1],nodes[step][0]), {icon:blackIcon}).addTo(mymap));
        }
        leafletNodes[step].on('click',function(){
            selectRoute(step);
        });
    }
    for (let step = 0; step < links.length; step++){
        var path = [[nodes[links[step][9]][1],nodes[links[step][9]][0]], [nodes[links[step][10]][1],nodes[links[step][10]][0]]];
        leafletLinks.push(L.polyline(path, {color: 'black',weight:10}).addTo(mymap));
        leafletLinks[step].bindTooltip("547", {permanent: true, direction:"center"}).openTooltip();
        if(links[step][3] == 1){
            L.polylineDecorator(leafletLinks[step],{
                patterns: [
                    // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                    {offset: '12%', repeat: '20%', symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {color:"yellow",stroke: true}})}
                ]
            }).addTo(mymap);
        }
    }
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
        orderLinksPicked = orderLinksPicked.slice(0,cutoff+1);
        orderNodesPicked = orderNodesPicked.slice(0,cutoff+1);
        currentIcon = icon;
    }
    else{
        for (let step = 0; step < links.length; step++){
            if(links[step][9] == currentIcon && links[step][10] == icon){

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

























/*
//add a line to the map
var path = [[47.12583382979998,-88.5745668411255],[47.12186989169294,-88.57360124588014]];
var road = L.polyline(path, {color: 'blue',weight:10}).addTo(mymap);
var path2 = [[47.12186989169294,-88.57360124588014] , [47.12180418857298,-88.56280803680421]];
var road2 = L.polyline(path2, {color: 'blue',weight:10}).addTo(mymap);

//change color on hover
road.on('mouseover', function(){
this.setStyle({
    color:'red'
});
});
road2.on('mouseover', function(){
    this.setStyle({
        color:'red'
    });
});

//When a line is clicked notify which road
road.on('click',function() {
alert("road 1 chosen");
});
road2.on('click',function() {
    alert("road 2 chosen");
});


//change color back after hover
road.on('mouseout', function() {
this.setStyle({color:'blue'})
});
road2.on('mouseout', function() {
this.setStyle({color:'blue'})
});

//add a marker
L.marker(L.latLng(47.12583382979998,-88.5745668411255)).addTo(mymap);
L.marker(L.latLng(47.12180418857298,-88.56280803680421)).addTo(mymap);

//right click on map to get notification with lat long
mymap.on('contextmenu', function(e) {
alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
});*/


