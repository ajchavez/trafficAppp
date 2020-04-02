function joinGame(){
    let userName = document.getElementById('username').value
    let gameID = document.getElementById('gameID').value
    localStorage.setItem("gameID", gameID)
    localStorage.setItem("username", userName)
    $.ajax({
        url: "/StudentJoin/addStudent",
        type:'POST',
        dataType: 'json',
        data: "value="+JSON.stringify({user: userName}),
        success: function (data) {
            document.getElementById("dummy").click()
        }
    });
}