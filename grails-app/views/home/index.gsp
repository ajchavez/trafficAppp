<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'stylesheets', file: 'home.css')}">
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'stylesheets', file: 'bootstrap.css')}">
    <link rel="stylesheet" media="screen and (max-width: 980px)"
          href="${resource(dir: 'stylesheets', file: 'home-mobile.css')}">
    <asset:javascript src="application.js"/>
</head>

<div class="home-container">
    <div class="home-header">Traffic Jam</div>


    <div>
        <g:link controller="gameSettings" action="index">
            <button type="button" class="btn btn-primary professor-button">Professor</button>
        </g:link>
    </div>

    <div>
        <g:link controller="student" action="index">
            <button type="button" class="btn btn-primary student-button">Student</button>
        </g:link>
    </div>

    <!-- Button trigger modal -->
    <div>
        <button type="button" class="btn btn-primary help-button" data-toggle="modal" data-target="#exampleModalCenter">
            How to use the app
        </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Help</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                %{--Modal text goes in here--}%
                <div class="modal-body">
                    This is how to use the app
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
</html>