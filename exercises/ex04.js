let count = 0;
let colorIndex = 0;
let mood;
let colors = ["Plum", "Orchid", "Lavender", "Pink"];
$("#needy-button").click( function(){
    if (count < 5) {mood = "fresh and happy";}
    else if ((count >= 5 ) && (count < 10)) {mood = "keep pushing";}
    else {mood = "so tired";}
    $("#needy-button").html("Clicks: " + count + "Color: " + colors[count] + " - " + mood);
    $("body").css("background-color", colors[colorIndex]);
    colorIndex += 1;
    count += 1;
    if (colorIndex == 4) {colorIndex = 0;}
});