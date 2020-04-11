var nodes = [null];
var links = [null];
var leafletLinks = [null];
var leafletNodes = [null];
var orderNodesPicked = [];
var orderLinksPicked = [];
var settings = null;
var dijkstrasPath = null

// graphlib references
// https://github.com/dagrejs/graphlib/wiki/API-Reference#graph-concepts
// https://github.com/dagrejs/graphlib/wiki
var graph = new graphlib.Graph({directed: true});

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
        if(settings.numStudents > 0) {
            $.when(getNodes(), getLinks(), previousTurn()).done(function (a1, a2, a3) {
                loadNetwork()
            })
        }
        else{
            setInterval(function(){
                getSettings()
                if(settings.numStudents > 0){
                    refreshPage()
                }
            },5000);
        }
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
function previousTurn(){
    //loadPreviousTurn
    return $.ajax({
        url: "/StudentTurn/getLastTurn",
        type:'POST',
        dataType: 'json',
        data: "value="+JSON.stringify({user: localStorage.getItem("username"), gameCode: localStorage.getItem("gameCode")}),
        success: function (data) {
            lastTurn = data
        }
    });
}

function loadNetwork(){
    //set up view of centered on network using first node
    var startLatLng = L.latLng(nodes[1].yCoord,nodes[1].xCoord)
    var mymap = L.map('map').setView(startLatLng, 12);
    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 10,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    console.log("Start node printing");
    for (let step = 1; step < nodes.length; step++) {
        var marker = null;


        // Add node to graph by it's nodeID and give it a label for logging purposes
        graph.setNode(nodes[step].nodeID, nodes[step].nodeID);
        console.log(graph.node(nodes[step].nodeID));

        if(step == lastTurn.startNode){
            leafletNodes.push(L.marker(L.latLng(nodes[step].yCoord,nodes[step].xCoord), {icon:greenIcon}).addTo(mymap));
        }
        else if(step == lastTurn.endNode){
            leafletNodes.push(L.marker(L.latLng(nodes[step].yCoord,nodes[step].xCoord), {icon:redIcon}).addTo(mymap));
        }
        else{
            leafletNodes.push(L.marker(L.latLng(nodes[step].yCoord,nodes[step].xCoord)));
        }
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
        graph.setEdge(links[step].uNodeID, links[step].dNodeID, weight);
        console.log("weight: " + graph.edge(links[step].uNodeID, links[step].dNodeID));
        leafletLinks[step].bindTooltip(""+weight, {permanent: true, direction:"center"});
        leafletLinks[step].closeTooltip()
        L.polylineDecorator(leafletLinks[step],{
            patterns: [
                // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                {offset: '75%', repeat: '100%', symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {color:"yellow",stroke: true}})}
            ]
        }).addTo(mymap);
    }

    var shortestPath = graphlib.alg.dijkstra(graph, 1, function(e) { return graph.edge(e); });
    console.log(shortestPath);
    dijkstrasPath = getShortestPath(lastTurn.startNode, lastTurn.endNode, shortestPath);
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
            if((parseInt(data)) % settings.numStudents == lastTurn.turnOrder){
                if(currentTurn == null && settings.numStudents != 1){
                    refreshPage()
                }
            }
            else {
                if(currentTurn != null && currentTurn != data){
                    refreshPage()
                }
                setTimeout(getCurrentTurn(),5000)
                currentTurn = data
            }
        }
    });
}
// Start: the start nodeID for the student
// End: the end nodeID for the student
// disjstraOutput[]: The output from running graphlib.alg.dijkstra, which is an array of objects
// Returns the list of the nodeIDs that make up the shortest path between two nodes
// TODO: Test on a bigger map
function getShortestPath(start, end, dijkstraOutput) {
    var finalPathNode = []; // Contains the nodeIDs of all the nodes in the shortest path
    var finalPathLink = [];
    // Initialize the current node to the last node in the path so we can work backwards
    var currentNode = end;

    // Loop backwards through the list of all nodes returned by the dijkstras algorithm
    // to find only the nodes on the shortest path
    // when dijkstraOutput[currentNode].predecessor is undefined
    // then that means that there is no predecessor and you are at
    // the start node
    while (dijkstraOutput[currentNode].predecessor !== undefined) {
        finalPathNode.push(parseInt(currentNode)); // Add it to the list
        links.forEach(function(link){
            if(link != null && link.dNodeID == currentNode && link.uNodeID == dijkstraOutput[currentNode].predecessor){
                finalPathLink.push(link.linkID)
            }
        })
        currentNode = dijkstraOutput[currentNode].predecessor; // Move to the next node
    }

    finalPathNode.push(start); // Finally, push the start node to complete the list
    console.log(finalPathNode.reverse());
    console.log(finalPathLink.reverse())
    return {
        node: finalPathNode.reverse(),
        link: finalPathLink.reverse()
    };
}

function showDijkstras(){
    if(lastTurn.lastLinkPath != null){
        removePrevious()
    }
    dijkstrasPath.link.forEach(function(link){
        leafletLinks[link].setStyle({
            color:'green'
        })
        leafletLinks[link].bringToFront()
        leafletLinks[link].openTooltip()
    })
    orderLinksPicked = dijkstrasPath.link
    orderNodesPicked = dijkstrasPath.node
}
function removePrevious(){
    lastTurn.lastLinkPath.forEach(function(link){
        leafletLinks[link].setStyle({
            color:'black'
        })
        leafletLinks[link].closeTooltip()
    })
}
function removeDijkstras(){
    dijkstrasPath.link.forEach(function(link){
        //leafletLinks off by 1
        leafletLinks[link].setStyle({
            color:'black'
        })
        leafletLinks[link].closeTooltip()
    })
}
function showPrevious(){
    if(lastTurn.lastLinkPath != null) {
        removeDijkstras()
        lastTurn.lastLinkPath.forEach(function (link) {
            leafletLinks[link].setStyle({
                color: 'blue'
            })
            leafletLinks[link].bringToFront()
            leafletLinks[link].openTooltip()
        })

        orderLinksPicked = lastTurn.lastLinkPath
        orderNodesPicked = lastTurn.lastNodePath
    }
    else{
        alert("There is no previous path saved")
    }
}
//send choices to update choices and update congestion
function endTurn(){
    $.ajax({
        url: "/StudentTurn/addTurn",
        type:'POST',
        dataType: 'json',
        data: "value="+JSON.stringify({user: localStorage.getItem("username"), gameCode:localStorage.getItem("gameCode"), network:settings.network,pathNode: orderNodesPicked,pathLink: orderLinksPicked, lastNodePath:lastTurn.lastNodePath, lastLinkPath:lastTurn.lastLinkPath }),
        success:refreshPage()
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