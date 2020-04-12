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
                    def numOfNodes = Node.findAllByNetwork(settings.network).size()
                    student.studentID = turn.user
                    student.gameCode = turn.gameCode

                    // Get random start and end nodes inclusively between 1 and n where n == number of nodes in the network
                    student.endNode = ((Math.random() * 100) % numOfNodes) + 1
                    student.startNode = ((Math.random() * 100) % numOfNodes) + 1

                    // Make sure that the start and end nodes are not the same
                    while (student.startNode == student.endNode) {
                        student.startNode = ((Math.random() * 100) % numOfNodes) + 1
                    }

                    println("Start node: " + student.startNode)
                    println("End node: " + student.endNode)

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
