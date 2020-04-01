package trafficapp

import grails.converters.JSON
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class StudentTurnController {

    StudentTurnService studentTurnService
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond studentTurnService.list(params), model:[studentTurnCount: studentTurnService.count()]
    }

    def show(Long id) {
        respond studentTurnService.get(id)
    }

    def addTurn(){
        //add turn to database
        def turn = JSON.parse(params.value)
        def student = StudentTurn.findAllByStudentID(turn.user).last()
        def copy = new StudentTurn()
        copy.studentID = student.studentID
        copy.endNode = student.endNode
        copy.startNode = student.startNode
        copy.lastLinkPath = turn.pathLink
        copy.lastNodePath = turn.pathNode
        copy.iteration = student.iteration + 1
        copy.save()

        //update congestion on Links
        def links = Link.findAll()
        if(turn.lastLinkPath != null) {
            turn.lastLinkPath.each { links[it].carsOnLink -= 1 }
        }
        turn.pathLink.each { links[it].carsOnLink += 1 }
        links.each{ it.save(flush:true) }
        render JSON.parse(params.value).pathLink
    }

    def getLastTurn(){
        render StudentTurn.findAllByStudentID("ajchavez").last() as JSON
    }

    /*def updateCarsOnLink(int [] removeCar, int [] addCar){
        def links = Link.findAll()
        if(removeCar != null) {
            removeCar.each { links[it].carsOnLink -= 1 }
        }
        addCar.each { links[it].carsOnLink += 1}
    }*/
    def create() {
        respond new StudentTurn(params)
    }

    def save(StudentTurn studentTurn) {
        if (studentTurn == null) {
            notFound()
            return
        }

        try {
            studentTurnService.save(studentTurn)
        } catch (ValidationException e) {
            respond studentTurn.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'studentTurn.label', default: 'StudentTurn'), studentTurn.id])
                redirect studentTurn
            }
            '*' { respond studentTurn, [status: CREATED] }
        }
    }

    def edit(Long id) {
        respond studentTurnService.get(id)
    }

    def update(StudentTurn studentTurn) {
        if (studentTurn == null) {
            notFound()
            return
        }

        try {
            studentTurnService.save(studentTurn)
        } catch (ValidationException e) {
            respond studentTurn.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'studentTurn.label', default: 'StudentTurn'), studentTurn.id])
                redirect studentTurn
            }
            '*'{ respond studentTurn, [status: OK] }
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        studentTurnService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'studentTurn.label', default: 'StudentTurn'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'studentTurn.label', default: 'StudentTurn'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
