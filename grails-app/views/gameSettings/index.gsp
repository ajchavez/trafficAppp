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
<html>
<head>
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'stylesheets', file: 'game-settings.css')}">
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'stylesheets', file: 'bootstrap.css')}">
    <asset:javascript src="application.js"/>
    <title>Game Settings</title>
</head>

<div class="main-container">

    <g:form controller="gameSettings" action="save">
        <div class="main-header">
            Game Settings
        </div>
    %{-- Change form input items corresponding to domain changes --}%
        <div class="wrapper">
            <div class="box a"><label for="maxIterations">Max Iterations</label></div>

            <div class="box b"><input type="number" step="1" id="maxIterations" name="maxIterations"
                                      placeholder="e.g. 3"></div>


            <div class="box c"><label for="algorithm">Cost Function</label></div>

            <div class="box d"><g:select name="algorithm" from="${['BPR', 'Polynomial']}"
                                         noSelection="['': '-Select An Algorithm-']"
                                         id="algorithm"/></div>

            <div class="box e"><label for="gameCode">Game Code</label></div>

            <div class="box f"><g:textField name="gameCode" value="${myValue}"/></div>
        </div>

    %{-- Change form input items corresponding to domain changes --}%
        <div style="text-align: center">
            <g:actionSubmit class="btn btn-primary submit-button" value="Start Game" action="save"/>
        </div>

    </g:form>

</html>

%{-- unused
    <label for="startNodeID">Start Node</label>
    <g:select name="startNodeID" from="${nodeList}" noSelection="['':'-Select A Node-']" id="startNodeID"></g:select>
    <label for="endNodeID">end Node</label>
    <g:select name="endNodeID" from="${nodeList}" noSelection="['':'-Select A Node-']" id="endNodeID"></g:select>
--}%

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