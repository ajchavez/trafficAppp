package trafficapp

import grails.converters.JSON

class PostGameController {

    def index() {
        def alg = GameSettings.first().getAlgorithm()
        render view: "index", model: [alg: alg]
        //render view: "index", model: [nodeList: nodeList]
    }

    // Removes all the student IDs and
    def removeStudentIDs() {
        def value = JSON.parse(params.value)
        def students = StudentTurn.findAllByGameCode(value.gameCode)
        students.each {
            it.delete() // Clears the StudentTurn table after the game is done??????????
            it.save(flush: true)
        }
    }

    // Sets carsOnLink to 0 for each link based on the input network name
    def resetLinks() {
        def value = JSON.parse(params.value)
        def links = Link.findAllByNetwork(value.network)
        links.each {
            it.carsOnLink = 0
            it.save(flush: true)
        }
    }
}
