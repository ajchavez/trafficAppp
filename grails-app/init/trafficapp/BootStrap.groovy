package trafficapp

class BootStrap {

    def init = { servletContext ->
        new Node(nodeID: 1, xCoord: -88.560008, yCoord: 47.112387).save()
        new Node(nodeID: 2, xCoord: -88.559289, yCoord: 47.117432).save()
        new Node(nodeID: 3, xCoord: -88.558785, yCoord: 47.119739).save()
        new Node(nodeID: 4, xCoord: -88.565598, yCoord: 47.118147).save()
        new Node(nodeID: 5, xCoord: -88.553624, yCoord: 47.116936).save()


        new Link(linkID: 1, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, aParam: 0, bParam: 0, cParam: 1, uNodeID: 1, dNodeID: 4, carsOnLink: 0).save()
        new Link(linkID: 2, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, aParam: 0, bParam: 0, cParam: 1, uNodeID: 1, dNodeID: 5, carsOnLink: 0).save()
        new Link(linkID: 3, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, aParam: 0, bParam: 0, cParam: 0, uNodeID: 4, dNodeID: 3, carsOnLink: 0).save()
        new Link(linkID: 4, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, aParam: 1, bParam: 0, cParam: 0, uNodeID: 5, dNodeID: 3, carsOnLink: 0).save()
        new Link(linkID: 5, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, aParam: 0, bParam: 0, cParam: 0, uNodeID: 4, dNodeID: 2, carsOnLink: 0).save()
        new Link(linkID: 6, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, aParam: 0, bParam: 0, cParam: 0, uNodeID: 5, dNodeID: 2, carsOnLink: 0).save()

        // Add for creating Roles and Users

        def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        def userRole = new Role(authority: 'ROLE_USER').save(flush: true)

        def testAdmin = new User(username: 'admin', password: 'password')
        testAdmin.save(flush: true)

        def testUser = new User(username: 'user', password: 'password')
        testUser.save(flush: true)

        UserRole.create testAdmin, adminRole, true
        UserRole.create testUser, userRole, true

        UserRole.withSession {
            it.flush()
            it.clear()
        }


    }
    def destroy = {
    }
}