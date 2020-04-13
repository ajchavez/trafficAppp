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
    $.when(assignTurnOrder(),numStudents()).done(function(a1, a2) {
        console.log(a1)
        //numStudents()
        document.getElementById("dummy").click()
    })
}
function assignTurnOrder(){
    console.log("turnOrder")
    return $.ajax({
        url: "/trafficapp/professorWait/assignTurnOrder",
        dataType: 'json',
        type: 'POST',
        data: "value="+JSON.stringify({gameCode: localStorage.getItem("gameCode")}),
        success:function (data) {
            console.log("assigned")
        }
    });
}
function numStudents(){
    console.log("numStudents")
    return $.ajax({
        url: "/trafficapp/professorWait/recordNumberStudents",
        dataType: 'text',
        type: 'POST',
        data: "value="+JSON.stringify({gameCode: localStorage.getItem("gameCode"), numStudents: studentList.length}),
        success:function (data) {
            console.log("assigned2")
        }
        //success:function (data) {document.getElementById("dummy").click()}
    });
}