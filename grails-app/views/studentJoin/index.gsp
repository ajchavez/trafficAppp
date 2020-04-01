<%--
  Created by IntelliJ IDEA.
  User: anthony
  Date: 4/1/20
  Time: 2:38 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
    <asset:javascript  src="jquery-3.3.1.min.js"/>
    <asset:stylesheet type="text/css" href="studentJoin.css"/>
    <asset:javascript  type="text/javascript" src="studentJoin.js"/>
</head>

<body>
<div>
    <div class = label><h6>GAME CODE</h6></div>
    <div class = input><input id = "gameID", type="text"></div>
    <div class = label><h6>NAME</h6></div>
    <div class = input><input id = "username", type="text"></div>
    <g:link controller="student" action="index">
        <button onclick="joinGame()">JOIN GAME</button>
    </g:link>
</div>
</body>
</html>