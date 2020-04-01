package trafficapp

import grails.converters.JSON

class StudentJoinController {

    def index() { }

    def addStudent(){

        def turn = JSON.parse(params.value)
        println(turn)
        def student= new StudentTurn()
        student.studentID = turn.user
        student.endNode = 2
        student.startNode = 0
        student.lastLinkPath = null
        student.lastNodePath = null
        student.iteration = 0
        student.save()
        render student as JSON
    }
}
