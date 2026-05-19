const colorText = document.getElementById("output-text")
$("#thought1").stop(true, true).slideUp(1)
$("#thought2").stop(true, true).slideUp(1)

let mainCharacter = {
    name: "Mion",
    favColor: ["red", "orange", "yellow", "green", "blue", "purple"],
    age: 100,
    isIrredescent: true,
}

const colors = new Map();
colors.set(0, "red");
colors.set(1, "orange");
colors.set(2, "yellow");
colors.set(3, "green");
colors.set(4, "blue");
colors.set(5, "purple");

let count = -1

$("#name").click(function() {
    $("#output-text").html(mainCharacter.name)
})

$("#age").click(function() {
    mainCharacter.age += 2
    $("#output-text").html(mainCharacter.age)
})

$("#color").click(function() {
    let stringcode = colors.get(count)
    colorText.classList.remove(stringcode)
    count += 1
    if (count > 5) {
        count = 0
    }
    let newStringcode = colors.get(count)
    colorText.classList.add(newStringcode)
    $("#output-text").html(mainCharacter.favColor[count])
    
})

$("#iri").click(function() {
    $("#output-text").html("you know it")
    let man1 = document.getElementById("man1")
    let man2 = document.getElementById("man2")

    let temp = man1.src
    man1.src = man2.src
    man2.src = temp
})

$("#gman1").hover(function(){
    $("#man1").addClass("opaqued")
    $("#thought1").stop(true, true).slideDown(300)
},
function(){
    $("#man1").removeClass("opaqued")
    $("#thought1").stop(true, true).slideUp(300)
})

$("#gman2").hover(function(){
    $("#man2").addClass("opaqued")
    $("#thought2").stop(true, true).slideDown(300)

},
function(){
    $("#man2").removeClass("opaqued")
    $("#thought2").stop(true, true).slideUp(300)

})

$("#gman1").click(function(){
    $("#output-text").html("I love you too")
})

$("#gman2").click(function(){
    $("#output-text").html("I love you three")
})