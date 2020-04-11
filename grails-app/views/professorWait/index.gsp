
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
    <asset:javascript  src="jquery-3.3.1.min.js"/>
    <asset:stylesheet type="text/css" href="gameSettings.css"/>
    <asset:javascript  type="text/javascript" src="professorWait.js"/>
</head>

<body>
<h3>GAME CODE</h3>
<h3 id = "code"></h3>
<div id = "students"></div>
<button onclick="recordNumberOfStudents()">START GAME</button>
<g:link controller="professor" action="index">
    <button id = "dummy" ></button>
</g:link>
</body>
</html>