package trafficapp

class ProfessorController {

    def index() {

    }

    def endGame() {
        // need code to force game end on all student screens
        redirect url: '/postGame'
    }
}
