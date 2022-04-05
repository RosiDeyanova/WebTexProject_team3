const canvas = document.getElementById("canvas")
canvas.width = 300
canvas.height = 300

let context = canvas.getContext("2d")
context.fillStyle = "white"
context.fillRect(0, 0, canvas.width, canvas.height)


let drawColor = "black"
let drawWidth = "50"
let isDrawing = false

let restoreArray = []
let index = -1

//TOOLS

const clearBtn = document.getElementById("clear-btn")
clearBtn.onclick = clearCanvas

function clearCanvas() {
    context.fillStyle = "white"
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillRect(0, 0, canvas.width, canvas.height)

    restoreArray = []
    index = -1
}

const undoBtn = document.getElementById("undo-btn")
undoBtn.onclick = function () {
    if(index <= 0) {
        clearCanvas()
    }
    else {
        index--
        restoreArray.pop()
        context.putImageData(restoreArray[index], 0, 0)
    }
}

const colorPicker = document.getElementById("color-picker")
colorPicker.oninput = function () {
    drawColor = colorPicker.value
}

const basicBlackColor = document.getElementById("black")
basicBlackColor.onclick = function () {
    changeColor("black")
    colorPicker.value = "#000000"
}
const basicGrayColor = document.getElementById("gray")
basicGrayColor.onclick = function () {
    changeColor("gray")
    colorPicker.value = "888888"
}
const basicDarkRedColor = document.getElementById("dark-red")
basicDarkRedColor.onclick = function () {
    changeColor("dark-red")
    colorPicker.value = "#8B0000"
}
const basicRedColor = document.getElementById("red")
basicRedColor.onclick = function () {
    changeColor("red")
    colorPicker.value = "#FF0000"
}
const basicOrangeColor = document.getElementById("orange")
basicOrangeColor.onclick = function () {
    changeColor("orange")
    colorPicker.value = "#FFA500"
}
const basicYellowColor = document.getElementById("yellow")
basicYellowColor.onclick = function () {
    changeColor("yellow")
    colorPicker.value = "#FFFF00"
}
const basicWhiteColor = document.getElementById("white")
basicWhiteColor.onclick = function () {
    changeColor("white")
    colorPicker.value = "#FFFFFF"
}
const basicPurpleColor = document.getElementById("purple")
basicPurpleColor.onclick = function () {
    changeColor("purple")
    colorPicker.value = "#800080"
}
const basicDarkBlueColor = document.getElementById("dark-blue")
basicDarkBlueColor.onclick = function () {
    changeColor("dark-blue")
    colorPicker.value = "#00008B"
}
const basicBlueColor = document.getElementById("blue")
basicBlueColor.onclick = function () {
    changeColor("blue")
    colorPicker.value = "#0000FF"
}
const basicGreenColor = document.getElementById("green")
basicGreenColor.onclick = function () {
    changeColor("green")
    colorPicker.value = "#008000"
}

function changeColor(colorElement) {
    drawColor = colorElement
}

const brushSize = document.getElementById("brush-size")

brushSize.oninput = function () {
    drawWidth = brushSize.value
}

//DRAWING TO THE CANVAS
// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });

//drawing logic
canvas.addEventListener("mousedown", startMouse, false)
canvas.addEventListener("touchstart", startTouch, false)

canvas.addEventListener("mousemove", drawMouse, false)
canvas.addEventListener("touchmove", drawTouch, false)

canvas.addEventListener("mouseup", stopMouse, false)
canvas.addEventListener("mouseout", stopMouse, false)
canvas.addEventListener("touchend", stopTouch, false)

//for mouse
function startMouse(event) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
    isDrawing = true
    context.beginPath()
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop) //clientX/Y are mouse coordinates and we offset them to be relative to the canvas
}

function drawMouse(event) {
    if (isDrawing) {
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
        context.strokeStyle = drawColor
        context.lineWidth = drawWidth
        context.lineCap = "round"
        context.lineJoin = "round"
        context.stroke()
    }
}

function stopMouse(event) {
    if (isDrawing) {
        context.stroke()
        context.closePath()
        isDrawing = false;
    }

    if (event.type != "mouseout")  {
    restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height))
    index++
    }
}

//for touch screen
let clientX, clientY;
function startTouch(event) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
    isDrawing = true
    context.beginPath()
    context.moveTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop) //clientX/Y are mouse coordinates and we offset them to be relative to the canvas
}

function drawTouch(event) {
    if (isDrawing) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
        context.lineTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop)
        context.strokeStyle = drawColor
        context.lineWidth = drawWidth
        context.lineCap = "round"
        context.lineJoin = "round"
        context.stroke()
    }
}

function stopTouch(event) {
    if (isDrawing) {
        context.stroke()
        context.closePath()
        isDrawing = false;
        console.log("stop")
    }

    if (event.type != "mouseout")  {
    restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height))
    index++
    }
}