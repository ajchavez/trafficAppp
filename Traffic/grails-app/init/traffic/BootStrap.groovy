package trafficapp

class BootStrap {

    def init = { servletContext ->
        new Node(nodeID: 1, xCoord: -88.560008, yCoord: 47.112387).save()
        new Node(nodeID: 2, xCoord: -88.559289, yCoord: 47.117432).save()
        new Node(nodeID: 3, xCoord: -88.558785, yCoord: 47.119739).save()
        new Node(nodeID: 4, xCoord: -88.565598, yCoord: 47.118147).save()
        new Node(nodeID: 5, xCoord: -88.553624, yCoord: 47.116936).save()


        new Link(linkID: 1, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 0, B: 0, C: 1, uNodeID: 1, dNodeID: 4).save()
        new Link(linkID: 2, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 0, B: 0, C: 1, uNodeID: 1, dNodeID: 5).save()
        new Link(linkID: 3, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 0, B: 0, C: 0, uNodeID: 4, dNodeID: 3).save()
        new Link(linkID: 4, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 1, B: 0, C: 0, uNodeID: 5, dNodeID: 3).save()
        new Link(linkID: 5, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 0, B: 0, C: 0, uNodeID: 4, dNodeID: 2).save()
        new Link(linkID: 6, linkLength: 1, numLanes: 1, capacity: 4, freeFlowTravelTime: 1, alpha: 0.15, beta: 4, A: 0, B: 0, C: 0, uNodeID: 5, dNodeID: 2).save()

        /*
        new Author(name:"Stephen King")
                .addToBooks(new Book(title:"The Stand", publishYear:1978))
                .addToBooks(new Book(title:"The Shining", publishYear:1977))
                .save()

        new Author(name:"Mark Twain")
                .addToBooks(new Book(title:"Tom Sawyer", publishYear:1876))
                .addToBooks(new Book(title:"Huckelberry Finn", publishYear:1884))
                .save()
        */
    }
    def destroy = {
    }
}