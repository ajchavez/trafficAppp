package trafficapp

class GameSettings {

    int maxIterations
    String algorithm
    int numStudents
    String gameCode
    String network



    static constraints = {
        numStudents blank: false, nullable: true
        gameCode unique: true, blank: false, nullable: false
        network blank: false, nullable: false
        //add constraints
    }
}
