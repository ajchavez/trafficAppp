package trafficapp

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class GameSettingsController {

    GameSettingsService gameSettingsService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        //params.max = Math.min(max ?: 10, 100)
        //respond gameSettingsService.list(params), model:[gameSettingsCount: gameSettingsService.count()]
        def nodes = Node.listOrderById()

        def nodeList = []
        for (int i = 0; i < nodes.size; i++) {
            nodeList << nodes[i].id
        }
        render view: "index", model: [nodeList: nodeList]

    }

    def show(Long id) {
        respond gameSettingsService.get(id)
    }

    def create() {
        respond new GameSettings(params)
    }

    def save(GameSettings gameSettings) {
        def gs = new GameSettings(params)
        gs.save()

        // Change this line to redirect gameSetting/index.gsp form submit to the professor's view when clicked
        redirect url: '/'
        /*
        if (gameSettings == null) {
            notFound()
            return
        }
        try {
            gameSettingsService.save(gameSettings)
        } catch (ValidationException e) {
            respond gameSettings.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'gameSettings.label', default: 'GameSettings'), gameSettings.id])
                redirect gameSettings
            }
            '*' { respond gameSettings, [status: CREATED] }
        }
        */
    }

    def edit(Long id) {
        respond gameSettingsService.get(id)
    }

    def update(GameSettings gameSettings) {

        /*
        if (gameSettings == null) {
            notFound()
            return
        }

        try {
            gameSettingsService.save(gameSettings)
        } catch (ValidationException e) {
            respond gameSettings.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'gameSettings.label', default: 'GameSettings'), gameSettings.id])
                redirect gameSettings
            }
            '*'{ respond gameSettings, [status: OK] }
        }
        */
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        gameSettingsService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'gameSettings.label', default: 'GameSettings'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'gameSettings.label', default: 'GameSettings'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
