package trafficapp

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class LinkController {

    LinkService linkService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond linkService.list(params), model:[linkCount: linkService.count()]
    }

    def show(Long id) {
        respond linkService.get(id)
    }

    def create() {
        respond new Link(params)
    }

    def save(Link link) {
        if (link == null) {
            notFound()
            return
        }

        try {
            linkService.save(link)
        } catch (ValidationException e) {
            respond link.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'link.label', default: 'Link'), link.id])
                redirect link
            }
            '*' { respond link, [status: CREATED] }
        }
    }

    def edit(Long id) {
        respond linkService.get(id)
    }

    def update(Link link) {
        if (link == null) {
            notFound()
            return
        }

        try {
            linkService.save(link)
        } catch (ValidationException e) {
            respond link.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'link.label', default: 'Link'), link.id])
                redirect link
            }
            '*'{ respond link, [status: OK] }
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        linkService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'link.label', default: 'Link'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'link.label', default: 'Link'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }

    def queryLink(){
        QueryService queryService
        render queryService.queryLinks(1)
    }
}
