$("#crAdd").click(function() {
    let crName=$("#crName").val();
    $("#creature-list").append("<div>"+crName+"</div>");
    $("#crName").val("")
});