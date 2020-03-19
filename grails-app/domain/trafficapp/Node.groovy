package trafficapp

class Node {

    int nodeID
    double xCoord
    double yCoord

    static constraints = {
        nodeID unique: true, blank: false, nullable: false
        xCoord blank: false, nullable: false
        yCoord blank: false, nullable: false
    }
}