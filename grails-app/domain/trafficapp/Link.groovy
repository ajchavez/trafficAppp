package trafficapp

class Link {

    int linkID
    double linkLength
    int numLanes
    int capacity
    double freeFlowTravelTime
    double alpha
    double beta
    double aParam
    double bParam
    double cParam
    int uNodeID
    int dNodeID
    int carsOnLink
    String network
    // Add network id field

    static constraints = {
        linkID unique: false, blank: false, nullable: false
        linkLength blank: false, nullable: false
        numLanes blank: false, nullable: false
        capacity blank: false, nullable: false
        freeFlowTravelTime blank: false, nullable: false
        alpha blank: false, nullable: false
        beta blank: false, nullable: false
        aParam blank: false, nullable: false
        bParam blank: false, nullable: false
        cParam blank: false, nullable: false
        uNodeID blank: false, nullable: false
        dNodeID blank: false, nullable: false
        carsOnLink blank : false, nullable : false
    }
}