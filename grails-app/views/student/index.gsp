<!doctype html>

<html>
<head>
    <asset:stylesheet type="text/css" href="leaflet.css"/>
    <!--<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />-->
    <!--<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>-->
    <asset:javascript type="text/javascript" src="leaflet.js"/>
    <asset:javascript  src="jquery-3.3.1.min.js"/>
    <asset:stylesheet type="text/css" href="studentView.css"/>
    <asset:javascript  type="text/javascript" src="studentLeaflet.js"/>
    <asset:javascript type="text/javascript" src="polylineDecorator.js"/>
    <!--<script src="https://bbecquet.github.io/Leaflet.PolylineDecorator/dist/leaflet.polylineDecorator.js"></script>-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>
<body>

<div id="map"></div>
<div id="buttonContainer">
    <button onclick="refreshPage()">Refresh</button>
    <button onclick="endTurn()">End Turn</button>
</div>



</body>
</html>

