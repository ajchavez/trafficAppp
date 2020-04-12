function saveGameCode(){
    var gameCode = document.getElementById('gameCode').value
    localStorage.setItem("gameCode", gameCode)
    document.getElementById("dummy").click()
}