package trafficapp

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class StudentTurnServiceSpec extends Specification {

    StudentTurnService studentTurnService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new StudentTurn(...).save(flush: true, failOnError: true)
        //new StudentTurn(...).save(flush: true, failOnError: true)
        //StudentTurn studentTurn = new StudentTurn(...).save(flush: true, failOnError: true)
        //new StudentTurn(...).save(flush: true, failOnError: true)
        //new StudentTurn(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //studentTurn.id
    }

    void "test get"() {
        setupData()

        expect:
        studentTurnService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<StudentTurn> studentTurnList = studentTurnService.list(max: 2, offset: 2)

        then:
        studentTurnList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        studentTurnService.count() == 5
    }

    void "test delete"() {
        Long studentTurnId = setupData()

        expect:
        studentTurnService.count() == 5

        when:
        studentTurnService.delete(studentTurnId)
        sessionFactory.currentSession.flush()

        then:
        studentTurnService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        StudentTurn studentTurn = new StudentTurn()
        studentTurnService.save(studentTurn)

        then:
        studentTurn.id != null
    }
}
