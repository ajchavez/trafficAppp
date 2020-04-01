package trafficapp

import grails.gorm.services.Service

@Service(StudentTurn)
interface StudentTurnService {

    StudentTurn get(Serializable id)

    List<StudentTurn> list(Map args)

    Long count()

    void delete(Serializable id)

    StudentTurn save(StudentTurn studentTurn)

}