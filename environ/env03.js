let mainCharacter = {
    name: "Mion",
    favColor: ["red", "orange", "yellow", "green", "blue", "purple"],
    age: 100,
    isIrredescent: true,
}

let count = 0

$("#name").click(function() {
    $("#output-text").html(mainCharacter.name)
})

$("#age").click(function() {
    mainCharacter.age += 2
    $("#output-text").html(mainCharacter.age)
})

$("#color").click(function() {
    count += 1
    arrayPos = count - 1
    if (arrayPos >= 5) {
        count = 0
    }
    $("#output-text").html(mainCharacter.favColor[arrayPos])
})

$("#iri").click(function() {
    $("#output-text").html("you know it")
})
