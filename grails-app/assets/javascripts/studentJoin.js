function joinGame(){
    let userName = document.getElementById('username').value
    let gameCode = document.getElementById('gameID').value
    localStorage.setItem("gameCode", gameCode)
    localStorage.setItem("username", userName)
    $.ajax({
        url: "/StudentJoin/addStudent",
        type:'POST',
        dataType: 'text',
        data: "value="+JSON.stringify({user: userName, gameCode: gameCode}),
        success: function (data) {
            if(data =="codeDoesntExist"){
                alert("Your game code doesnt exist")
            }
            else if(data == "gameAlreadyStarted"){
                alert("This game has already started")
            }
            else if(data == "nameTaken"){
               alert("Someone already has this name")
            }
            else{
                document.getElementById("dummy").click()
            }
        }
    });
}