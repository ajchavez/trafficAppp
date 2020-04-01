package trafficapp

//import com.gargoylesoftware.htmlunit.javascript.background.GAEJavaScriptExecutor
import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class GameSettingsSpec extends Specification implements DomainUnitTest<GameSettings> {

    void setupSpec(){
        mockDomains GameSettings, Node, Link
    }

    void "test basic Game Setting persistence"(){
        setup:

        new GameSettings(maxIterations: 5, startNodeID: 1, endNodeID: 5).save(flush: true, failOnError: true)
        new Node(nodeID: 1, xCoord: -88.560008, yCoord: 47.112387).save(flush: true, failOnError: true)
        new Node(nodeID: 2, xCoord: -88.559289, yCoord: 47.117432).save(flush: true, failOnError: true)
        new Node(nodeID: 3, xCoord: -88.558785, yCoord: 47.119739).save(flush: true, failOnError: true)
        new Node(nodeID: 4, xCoord: -88.565598, yCoord: 47.118147).save(flush: true, failOnError: true)
        new Node(nodeID: 5, xCoord: -88.553624, yCoord: 47.116936).save(flush: true, failOnError: true)


        new Link(linkID: 1, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 0, B: 0, C: 1, uNodeID: 1, dNodeID: 4).save(flush: true, failOnError: true)
        new Link(linkID: 2, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 0, B: 0, C: 1, uNodeID: 1, dNodeID: 5).save(flush: true, failOnError: true)
        new Link(linkID: 3, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 0, B: 0, C: 0, uNodeID: 4, dNodeID: 3).save(flush: true, failOnError: true)
        new Link(linkID: 4, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 1, B: 0, C: 0, uNodeID: 5, dNodeID: 3).save(flush: true, failOnError: true)
        new Link(linkID: 5, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 0, B: 0, C: 0, uNodeID: 4, dNodeID: 2).save(flush: true, failOnError: true)
        new Link(linkID: 6, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 0, B: 0, C: 0, uNodeID: 5, dNodeID: 2).save(flush: true, failOnError: true)


        expect:
        GameSettings.count == 1
        Link.count == 6
        Node.count == 5

        Link.findByLinkID(6).uNodeID == 5
        Link.findByLinkID(6).dNodeID == 2

        Node.findByNodeID(GameSettings.findByStartNodeID(1)).xCoord == -88.560008
        /*
        Author.count == 2
        Book.count == 4

        Author.findByName("Stephen King").books.size() == 2
        Author.findByName("Mark Twain").books.size() == 2
        */
    }
}
