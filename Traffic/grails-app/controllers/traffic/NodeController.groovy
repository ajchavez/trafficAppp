package trafficapp

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class NodeController {

    NodeService nodeService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond nodeService.list(params), model:[nodeCount: nodeService.count()]
    }

    def show(Long id) {
        respond nodeService.get(id)
    }

    def queryNodes(){
        def nodes = Node.findAll()
        //render nodes


//        def out = []
//        nodes.each {out << [it.xCoord, it.yCoord]}
//        render out

        nodes.each {render it.xCoord+","+it.yCoord+"/"}

    }

    def create() {
        respond new Node(params)
    }

    def save(Node node) {
        if (node == null) {
            notFound()
            return
        }

        try {
            nodeService.save(node)
        } catch (ValidationException e) {
            respond node.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'node.label', default: 'Node'), node.id])
                redirect node
            }
            '*' { respond node, [status: CREATED] }
        }
    }

    def edit(Long id) {
        respond nodeService.get(id)
    }

    def update(Node node) {
        if (node == null) {
            notFound()
            return
        }

        try {
            nodeService.save(node)
        } catch (ValidationException e) {
            respond node.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'node.label', default: 'Node'), node.id])
                redirect node
            }
            '*'{ respond node, [status: OK] }
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        nodeService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'node.label', default: 'Node'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'node.label', default: 'Node'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
