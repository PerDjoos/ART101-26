function askNumber(whatNumber){
    let userNumber = prompt("guess 1-10");
    if (userNumber == whatNumber) {
        $("#output").html("You got it!")
    }
    else {
        $("#output").html("Wrong!")
    }
}

$("#good-button").click(function() {
    askNumber(5)
})