console.log("Save GameSettings");
$(document).ready( function(){
    $('#formSave').click(function(){
        console.log("formSave click function");
        $.post(
            "/gameSettings/save",
            {
                maxIterations: $('#maxIterations'),
                startNodeID: $('#startNodeID'),
                endNodeID: $('#endNodeID') },
            "professorviewindex");
    });
});