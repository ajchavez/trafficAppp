package trafficapp

class StudentTurn {
    String studentID
    String gameCode
    int iteration
    int startNode
    int endNode
    int[] lastNodePath
    int[] lastLinkPath
    int turnOrder


    static constraints = {
        studentID blank: false, nullable: false
        gameCode blank: false, nullable: false
        iteration blank: false, nullable: false
        startNode blank: false, nullable: false
        endNode blank: false, nullable: false
        lastNodePath blank: false, nullable: true
        lastLinkPath blank: false, nullable: true
    }
}