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
    <div class="home-header">CAV Routing Game</div>

    <div>
        <g:link controller="gameSettings" action="index">
            <button type="button" class="btn btn-primary professor-button">Professor</button>
        </g:link>
    </div>

    <div>
        <g:link controller="studentJoin" action="index">
            <button type="button" class="btn btn-primary student-button">Student</button>
        </g:link>
    </div>

    <!-- Button trigger modal -->
    <div>
        <button type="button" class="btn btn-primary help-button" data-toggle="modal" data-target="#exampleModalCenter">
            App Information
        </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle"><b>Welcome to the CAV Routing Game!</b></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                %{--Modal text goes in here--}%
                <div class="modal-body" align="left">

                    This app is an instructional tool used by Dr. Zhang and his students
                    in order simulate the routing choices that all automated vehicles will make in the future.<br><br>

                    <b>How the Simulation Works</b><br>
                    <ul style="list-style-type:circle;">
                        <li>The simulation takes place on a map that includes several nodes and various paths that connect them.</li>
                        <li>First, the professor will set up a game session and students will join using their mobile devices.</li>
                        <li>The app will assign each student with a random start location and a random destination they will be travelling to.</li>
                        <li>A routing algorithm will then display the fastest path that it calculates for each student's route.</li>
                        <li>Students will take turns selecting their calculated path until all students have chosen.</li>
                        <li><b>This marks the end of the first iteration</b></li>
                    </ul>
                    <br>
                    After the first iteration, students will begin again only this time they will be able to <b>choose</b>
                    between their previous path and a newly calculated path.<br><br>

                    This process will continue until either the professor ends the simulation or all
                    students decide that they have chosen their quickest route.


                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
</html>