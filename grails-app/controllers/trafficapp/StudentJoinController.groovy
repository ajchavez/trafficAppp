package trafficapp

import grails.converters.JSON

class StudentJoinController {

    def index() { }

    def addStudent(){
        def turn = JSON.parse(params.value)
        def settings = GameSettings.findAllByGameCode(turn.gameCode)
        if(settings.size()==0){
            render "codeDoesntExist"
        }
        else {
            settings = settings.last()
            if (settings.numStudents > 0) {
                render "gameAlreadyStarted"
            }
            else {
                if(StudentTurn.findAllByGameCodeAndStudentID(turn.gameCode, turn.user).size() != 0){
                    render "nameTaken"
                }
                else {
                    def student = new StudentTurn()
                    student.studentID = turn.user
                    student.gameCode = turn.gameCode
                    student.endNode = 3
                    student.startNode = 1
                    student.lastLinkPath = null
                    student.lastNodePath = null
                    student.iteration = 0
                    student.turnOrder = -1
                    student.save()
                    render "studentAdded"
                }
            }
        }
    }
}
