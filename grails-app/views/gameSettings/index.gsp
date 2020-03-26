%{--<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main" />
    <g:set var="entityName" value="${message(code: 'gameSettings.label', default: 'GameSettings')}" />
    <title><g:message code="default.list.label" args="[entityName]" /></title>
</head>
<body>
<a href="#list-gameSettings" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
<div class="nav" role="navigation">
    <ul>
        <li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
        <li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
    </ul>
</div>
<div id="list-gameSettings" class="content scaffold-list" role="main">
    <h1><g:message code="default.list.label" args="[entityName]" /></h1>
    <g:if test="${flash.message}">
        <div class="message" role="status">${flash.message}</div>
    </g:if>
    <f:table collection="${gameSettingsList}" />

    <div class="pagination">
        <g:paginate total="${gameSettingsCount ?: 0}" />
    </div>
</div>
</body>
</html>
--}%

<!DOCTYPE html>
<head>

</head>
<body>
<h1>Game Settings</h1>
<g:form controller="gameSettings" action="save" >

    %{-- Change form input items corresponding to domain changes --}%
    <label for="maxIterations">Max Iterations</label>
    <input type="number" step="1" id="maxIterations" name="maxIterations" placeholder="e.g. 3">
    <label for="startNodeID">Start Node</label>
    <g:select name="startNodeID" from="${nodeList}" noSelection="['':'-Select A Node-']" id="startNodeID"></g:select>
    <label for="endNodeID">end Node</label>
    <g:select name="endNodeID" from="${nodeList}" noSelection="['':'-Select A Node-']" id="endNodeID"></g:select>
    %{-- Change form input items corresponding to domain changes --}%

    <g:actionSubmit value="Submit" action="save"></g:actionSubmit>
</g:form>
</body>
</html>

%{--
<!DOCTYPE html>
<head>

</head>
<body>
<h1>Game Settings</h1>
<g:form controller="professorindexview">
    <label for="maxIterations">Max Iterations</label>
    <input type="number" step="1" id="maxIterations" name="maxIterations" placeholder="e.g. 3">
    <label for="startNodeID">Start Node</label>
    <g:select name="startNodeID" from="${nodeList}" noSelection="['':'-Select A Node-']" id="startNodeID"></g:select>
    <label for="endNodeID">End Node</label>
    <g:select name="endNodeID" from="${nodeList}" noSelection="['':'-Select A Node-']" id="endNodeID"></g:select>
    <g:link controller="gameSettings" action="save" elementId="formSave">Submit</g:link>
</g:form>

<asset:javascript src="gameSettingsSubmit.js"/>

</body>
</html>
--}%