package trafficapp

import grails.gorm.services.Service

@Service(Link)
interface LinkService {

    Link get(Serializable id)

    List<Link> list(Map args)

    Long count()

    void delete(Serializable id)

    Link save(Link link)

}