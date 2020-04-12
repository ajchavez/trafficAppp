package trafficapp

import grails.converters.JSON

class ProfessorWaitController {

    def index() { }

    def getStudents(){
        def value = JSON.parse(params.value)
        render StudentTurn.findAllByIterationAndGameCode(0,value.gameCode) as JSON
    }
    def recordNumberStudents(){
        def value = JSON.parse(params.value)
        def settings = GameSettings.findAllByGameCode(value.gameCode).first()
        settings.numStudents = StudentTurn.findAllByIterationAndGameCode(0,value.gameCode).size()
        settings.save(flush:true)
        render settings.numStudents
    }
    def assignTurnOrder(){
        def value = JSON.parse(params.value)
        def students = StudentTurn.findAllByGameCode(value.gameCode)
        def turn = 0
        students.each {
            it.turnOrder = turn
            it.save(flush:true)
            turn = turn += 1
        }
    }
}
