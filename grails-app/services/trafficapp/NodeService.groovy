package trafficapp

import grails.gorm.services.Service

@Service(Node)
interface NodeService {

    Node get(Serializable id)

    List<Node> list(Map args)

    Long count()

    void delete(Serializable id)

    Node save(Node node)

}