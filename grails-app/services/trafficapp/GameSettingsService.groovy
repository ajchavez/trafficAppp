package trafficapp

import grails.gorm.services.Service

@Service(GameSettings)
interface GameSettingsService {

    GameSettings get(Serializable id)

    List<GameSettings> list(Map args)

    Long count()

    void delete(Serializable id)

    GameSettings save(GameSettings gameSettings)

}