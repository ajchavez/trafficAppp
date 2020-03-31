package trafficapp

class PostGameController {

    def index() {
        def alg = GameSettings.first().getAlgorithm()
        render alg

    }
}
