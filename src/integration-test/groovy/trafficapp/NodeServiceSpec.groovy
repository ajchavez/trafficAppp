package trafficapp

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class NodeServiceSpec extends Specification {

    NodeService nodeService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Node(...).save(flush: true, failOnError: true)
        //new Node(...).save(flush: true, failOnError: true)
        //Node node = new Node(...).save(flush: true, failOnError: true)
        //new Node(...).save(flush: true, failOnError: true)
        //new Node(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //node.id
    }

    void "test get"() {
        setupData()

        expect:
        nodeService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Node> nodeList = nodeService.list(max: 2, offset: 2)

        then:
        nodeList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        nodeService.count() == 5
    }

    void "test delete"() {
        Long nodeId = setupData()

        expect:
        nodeService.count() == 5

        when:
        nodeService.delete(nodeId)
        sessionFactory.currentSession.flush()

        then:
        nodeService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Node node = new Node()
        nodeService.save(node)

        then:
        node.id != null
    }
}
