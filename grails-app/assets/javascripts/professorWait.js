var studentList = []
$(document).ready(function() {
    $("#code").text(localStorage.getItem("gameCode"))
    getStudents();
    setInterval(function(){
        getStudents();
    },5000);
});

function getStudents(){
    $.ajax({
        url: "/trafficapp/professorWait/getStudents",
        dataType: 'json',
        type:'POST',
        data: "value="+JSON.stringify({gameCode: localStorage.getItem("gameCode")}),
        success: function (data) {
            data.forEach(function (student) {
                if (!studentList.includes(student.studentID)) {
                    var h4 = document.createElement("h4")
                    h4.textContent = student.studentID

                    $("#students").append(h4)
                    studentList.push(student.studentID)
                }

            });
        }
    });
}

function recordNumberOfStudents() {
    $.when(assignTurnOrder()).done(function(a1) {
        numStudents()
    })
}
function assignTurnOrder(){
    $.ajax({
        url: "/trafficapp/professorWait/assignTurnOrder",
        dataType: 'json',
        type: 'post',
        data: "value="+JSON.stringify({gameCode: localStorage.getItem("gameCode")})
    });
}
function numStudents(){
    $.ajax({
        url: "/trafficapp/professorWait/recordNumberStudents",
        dataType: 'json',
        type: 'post',
        data: "value="+JSON.stringify({gameCode: localStorage.getItem("gameCode"), numStudents: studentList.length}),
        success:function (data) {document.getElementById("dummy").click()}
    });
}