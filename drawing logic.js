//the white serface we can draw on
const canvas = document.getElementById("canvas")
canvas.width = 300  //TODO: figure out how to make the canvas be wider than the page and add the ability to scroll only the canvas
canvas.height = 300 //TODO: also figure out how to zoom in and out

//initializes the canvas to be all white
let context = canvas.getContext("2d")
context.fillStyle = "white"
context.fillRect(0, 0, canvas.width, canvas.height)

let drawColor = "black" //color used for brush and will be used for other tools
let drawWidth = "50" //sive of the brush or other tool

let isDrawing = false //a flag that is true when we start drawing

let historyArray = [] //history array to keep each step of the drawing used to make undo possible
let index = -1 //index for the array when its -1 we know its empty

//TOOLS

const clearBtn = document.getElementById("clear-btn") //for now this is button "New" from "More"
clearBtn.onclick = clearCanvas

//re-initializes the canvas to be all white with empty history array
function clearCanvas() {
    context.fillStyle = "white"
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillRect(0, 0, canvas.width, canvas.height)

    historyArray = []
    index = -1
}

//check if we have items in the history array and if so returns to the previous one returning our drawing to the previous step
const undoBtn = document.getElementById("undo-btn")
undoBtn.onclick = function () {
    if(index <= 0) {
        clearCanvas()
    }
    else {
        index--
        historyArray.pop()
        context.putImageData(historyArray[index], 0, 0)
    }
}

//COLORS for mobile

//color input element
const colorPicker = document.getElementById("color-picker")
colorPicker.oninput = function () {
    drawColor = colorPicker.value
}

//each one of basic...Color is used when we choose a color from the color-palette, they do not only pick a color for drawColor but also set the color picker value to the same color
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
    changeColor("#8B0000")
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
    changeColor("#00008b")
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

//COLORS for desktop

//color input element
const colorPickerDesktop = document.getElementById("color-picker-desktop")
colorPickerDesktop.oninput = function () {
    drawColor = colorPickerDesktop.value
}

//each one of desktop...Color is used when we choose a color from the color-palette, they do not only pick a color for drawColor but also set the color picker value to the same color
const desktopBlackColor = document.getElementById("desktop-black")
desktopBlackColor.onclick = function () {
    changeColor("black")
    colorPickerDesktop.value = "#000000"
}
const desktopWhiteColor = document.getElementById("desktop-white")
desktopWhiteColor.onclick = function () {
    changeColor("white")
    colorPickerDesktop.value = "#FFFFFF"
}
const desktopGrayColor = document.getElementById("desktop-gray")
desktopGrayColor.onclick = function () {
    changeColor("gray")
    colorPickerDesktop.value = "#888888"
}
const desktopRedColor = document.getElementById("desktop-red")
desktopRedColor.onclick = function () {
    changeColor("red")
    colorPickerDesktop.value = "#FF0000"
}
const desktopLimeColor = document.getElementById("desktop-lime")
desktopLimeColor.onclick = function () {
    changeColor("#00FF00")
    colorPickerDesktop.value = "#00FF00"
}
const desktopBlueColor = document.getElementById("desktop-blue")
desktopBlueColor.onclick = function () {
    changeColor("blue")
    colorPickerDesktop.value = "#0000FF"
}
const desktopYellowColor = document.getElementById("desktop-yellow")
desktopYellowColor.onclick = function () {
    changeColor("yellow")
    colorPickerDesktop.value = "#FFFF00"
}
const desktopOrangeColor = document.getElementById("desktop-orange")
desktopOrangeColor.onclick = function () {
    changeColor("orange")
    colorPickerDesktop.value = "#FFA500"
}
const desktopPurpleColor = document.getElementById("desktop-purple")
desktopPurpleColor.onclick = function () {
    changeColor("purple")
    colorPickerDesktop.value = "#800080"
}
const desktopDarkRedColor = document.getElementById("desktop-dark-red")
desktopDarkRedColor.onclick = function () {
    changeColor("#8B0000")
    colorPickerDesktop.value = "#8B0000"
}
const desktopGreenColor = document.getElementById("desktop-green")
desktopGreenColor.onclick = function () {
    changeColor("green")
    colorPickerDesktop.value = "#008000"
}
const desktopDarkBlueColor = document.getElementById("desktop-dark-blue")
desktopDarkBlueColor.onclick = function () {
    changeColor("#00008b")
    colorPickerDesktop.value = "#00008B"
}


//function to change the drawColor to a specific other color
function changeColor(colorElement) {
    drawColor = colorElement
}

//SIZE

//for mobile
const brushSize = document.getElementById("brush-size") //slider input for size

brushSize.oninput = function () {
    drawWidth = brushSize.value
}

//for desktop
const desktopBrushSize = document.getElementById("brush-size-desktop") //slider input for size

desktopBrushSize.oninput = function () {
    drawWidth = desktopBrushSize.value
}

//DRAWING TO THE CANVAS

// Prevent scrolling or refreshing the page when touching the canvas (only for touchscreen)
document.body.addEventListener("touchstart", function (event) {
    if (event.target == canvas) {
      event.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener("touchend", function (event) {
    if (event.target == canvas) {
      event.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener("touchmove", function (event) {
    if (event.target == canvas) {
      event.preventDefault();
    }
  }, { passive: false });

//drawing logic
//calls start to draw functions for when we press down the left mouse button or touch the screen
canvas.addEventListener("mousedown", startMouse, false)
canvas.addEventListener("touchstart", startTouch, false)

//calls drawing functions when we move the mouse or the finger on the screen
canvas.addEventListener("mousemove", drawMouse, false)
canvas.addEventListener("touchmove", drawTouch, false)

//calls a stop drawing function when we release the mouse button or stop touching the screen
canvas.addEventListener("mouseup", stopMouse, false)
canvas.addEventListener("mouseout", stopMouse, false) //also calls stop drawing function if we go outside the screen with the mouse
canvas.addEventListener("touchend", stopTouch, false)

//for mouse
function startMouse(event) {
    isDrawing = true
    context.beginPath()
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop) //event.clientX/Y are mouse coordinates and we offset them to be relative to the canvas
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
    
        //after we are done with this step of the drawing we take the painting so far and push it on the history array
        historyArray.push(context.getImageData(0, 0, canvas.width, canvas.height))
        index++
    }
}

//for touch screen
let clientX, clientY; //seems like for touchscreen there is an array of clientX/Ys so we take only the first one
function startTouch(event) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
    isDrawing = true
    context.beginPath()
    context.moveTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop)
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

        //after we are done with this step of the drawing we take the painting so far and push it on the history array
        historyArray.push(context.getImageData(0, 0, canvas.width, canvas.height))
        index++
    }

}

