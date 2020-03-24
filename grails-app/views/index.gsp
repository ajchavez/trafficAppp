<!doctype html>

<html>
<head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
    <asset:javascript  src="jquery-3.3.1.min.js"/>
    <asset:stylesheet type="text/css" href="studentView.css"/>
    <asset:javascript  type="text/javascript" src="studentLeaflet.js"/>
    <script src="http://bbecquet.github.io/Leaflet.PolylineDecorator/dist/leaflet.polylineDecorator.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>
<body>
<!-- Simple get location -->

<div id="map"></div>
<div id="buttonContainer">
    <button>Refresh</button>
    <button>Submit</button>
    <g:link controller="Node" action="queryNodes">this link</g:link>
</div>



</body>
</html>

