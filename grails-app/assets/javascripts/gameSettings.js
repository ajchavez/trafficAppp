function saveGameCode(){
    let gameCode = document.getElementById('gameCode').value
    localStorage.setItem("gameCode", gameCode)
    document.getElementById("dummy").click()
}