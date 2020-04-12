function joinGame(){
    // bottom 2 lines were let
    var userName = document.getElementById('username').value
    var gameID = document.getElementById('gameID').value
    localStorage.setItem("gameID", gameID)
    localStorage.setItem("username", userName)
    $.ajax({
        url: "/trafficapp/StudentJoin/addStudent",
        type:'POST',
        dataType: 'json',
        data: "value="+JSON.stringify({user: userName}),
        success: function (data) {
            document.getElementById("dummy").click()
        }
    });

}