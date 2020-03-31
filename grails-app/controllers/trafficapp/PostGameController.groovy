package trafficapp

class PostGameController {

    def index() {
        def alg = GameSettings.first().getAlgorithm()
        render view: "index", model: [alg: alg]
        //render view: "index", model: [nodeList: nodeList]



    }
}
