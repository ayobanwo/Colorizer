var panel = document.querySelector(".panel");
var pickers = document.querySelectorAll(".selectors .colorp");
var selected = document.querySelector(".selected");
var selectedp = document.querySelectorAll(".selected .colorp");
var result = document.querySelector(".result .colorp");
var overlay_inn = document.querySelector(".overlay_inner");
var trigger = document.getElementsByClassName("trigger")[0];
trigger.onclick = function () {
    var video = document.getElementById("Rectangle_6");
    video.autoplay = true;
    video.load();
    video.play();
    overlay_inn.classList.add("inverted_trigger");
    trigger.style.display = "none";
    panel.classList.add("active");
};

function getRGB(color) {
    var rgb = [];
    switch (color) {
        case "Red":
            rgb = [255, 0, 0];
            break;
        case "Blue":
            rgb = [0, 0, 255];
            break;
        case "Green":
            rgb = [0, 255, 0];
            break;
        case "Black":
            rgb = [0, 0, 0];
            break;
        case "Yellow":
            rgb = [255, 255, 0];
            break;
    }
    return rgb;
}

function switcher(event) {
    for (var i = 0; i < selectedp.length; i++) {
        var value = selectedp[i].getAttribute("data-color-value");
        if (value == "") {
            selectedp[i].style.background = event.target.getAttribute("data-color-value");
            selectedp[i].setAttribute("data-color-value", getRGB(event.target.getAttribute("data-color-value")));
            if (i == 1) addColors();
            return;
        }
    }
}


//colorChannelA and colorChannelB are ints ranging from 0 to 255
function colorChannelMixer(colorChannelA, colorChannelB, amountToMix) {
    var channelA = colorChannelA * amountToMix;
    var channelB = colorChannelB * (1 - amountToMix);
    return parseInt(channelA + channelB);
}
//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
function colorMixer(rgbA, rgbB, amountToMix) {
    var r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
    var g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
    var b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function addColors() {
    var rgbA = [];
    var rgbB = [];
    for (var i = 0; i < selectedp.length; i++) {
        if (i == 0) var rgbA = JSON.parse("[" + selectedp[i].getAttribute("data-color-value") + "]");
        if (i == 1) rgbB = JSON.parse("[" + selectedp[i].getAttribute("data-color-value") + "]");
    }
    var final = colorMixer(rgbA, rgbB, 0.5);
    result.style.background = final;
    //switch()
}
function reload() {
    for (var i = 0; i < selectedp.length; i++) {
        selectedp[i].style.background = "#f2f2f2";
        selectedp[i].setAttribute("data-color-value", "");
    }
}

for (var i = 0; i < pickers.length; i++) {
    pickers[i].addEventListener("click", switcher, true);
    //itemsvg[i].removeEventListener("click", switcher, true);
}

selected.addEventListener("click", reload, true);