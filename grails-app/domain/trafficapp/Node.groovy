package trafficapp

class Node {

    int nodeID
    double xCoord
    double yCoord
    String network

    static constraints = {
        nodeID unique: false, blank: false, nullable: false
        xCoord blank: false, nullable: false
        yCoord blank: false, nullable: false
    }
}