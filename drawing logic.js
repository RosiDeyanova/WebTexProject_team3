import { bucket } from './bucket.js'
import { startDrawingDesktop, drawingDesktop, stopDrawingDesktop, startDrawingMobile, drawingMobile, stopDrawingMobile } from './brush.js'
import { startErasing, stopErasing, erasing } from './public/eraser-tool.js'

//the white serface we can draw on
export const canvas = document.getElementById("canvas")

let widthCanvas = 310
let heightCanvas = 520

canvas.width = widthCanvas  //TODO: figure out how to make the canvas be wider than the page and add the ability to scroll only the canvas
canvas.height = heightCanvas //TODO: also figure out how to zoom in and out

//initializes the canvas to be all white
export let context = canvas.getContext("2d")
context.fillStyle = "white"
context.fillRect(0, 0, canvas.width, canvas.height)

export let drawColor = "#000000" //color used for brush and will be used for other tools
export let drawWidth = "50" //sive of the brush or other tool

let toolInUse = "brush"

let isDrawing = false //a flag that is true when we start drawing

let historyArray = [] //history array to keep each step of the drawing used to make undo possible
let index = -1 //index for the array when its -1 we know its empty

function addToHistory() {
    //after we are done with this step of the drawing we take the painting so far and push it on the history array
    historyArray.push(context.getImageData(0, 0, canvas.width, canvas.height))
    index++ 
}

//TOOLS

//for desktop
const brushBtn = document.getElementById("brush-desktop")
brushBtn.onclick = function () {
    toolInUse = "brush"
}

const sprayBtn = document.getElementById("spray-desktop")
sprayBtn.onclick = function () {
    toolInUse = "spray"
}

const pencilBtn = document.getElementById("pencil-desktop")
pencilBtn.onclick = function () {
    toolInUse = "pencil"
}

const bucketBtn = document.getElementById("bucket-desktop")
bucketBtn.onclick = function () {
    toolInUse = "bucket"
}

const eraserBtn = document.getElementById("eraser-desktop")
eraserBtn.onclick = function () {
    toolInUse = "eraser"
}

const zoomBtn = document.getElementById("zoom-desktop")
zoomBtn.onclick = function () {
    toolInUse = "zoom"
}

//for mobile
const brushBtnMob = document.getElementById("brush-mobile")
brushBtnMob.onclick = function () {
    toolInUse = "brush"
}

const sprayBtnMob = document.getElementById("spray-mobile")
sprayBtnMob.onclick = function () {
    toolInUse = "spray"
}

const pencilBtnMob = document.getElementById("pencil-mobile")
pencilBtnMob.onclick = function () {
    toolInUse = "pencil"
}

const bucketBtnMob = document.getElementById("bucket-mobile")
bucketBtnMob.onclick = function () {
    toolInUse = "bucket"
}

const eraserBtnMob = document.getElementById("eraser-mobile")
eraserBtnMob.onclick = function () {
    toolInUse = "eraser"
}

const zoomBtnMob = document.getElementById("zoom-mobile")
zoomBtnMob.onclick = function () {
    toolInUse = "zoom"
}

//for both
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

let lastChanges = [];

//check if we have items in the history array and if so returns to the previous one returning our drawing to the previous step
const undoBtn = document.getElementById("undo-btn")
undoBtn.onclick = function () 
{
    if(index <= 0) 
    {
        clearCanvas()
    }
    else 
    {
        lastChanges.push(historyArray[historyArray.length - 1]);
        index--
        historyArray.pop()
        context.putImageData(historyArray[index], 0, 0)
    }
}


const redoBtn = document.getElementById("btn-redo");
redoBtn.addEventListener("click", event =>
{ 
    index++;
    historyArray.push(lastChanges[lastChanges.length - 1]);
    context.putImageData(historyArray[index], 0, 0);
    lastChanges.pop();
});


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
    changeColor("rgb(0, 0, 255)")
    colorPicker.value = "rgb(0, 0, 255)"
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
    switch (toolInUse) {
        case "brush":
            isDrawing = true
            startDrawingDesktop(event)
            break

        case "spray":
            console.log("clicked down with spray")
            break

        case "pencil":
            console.log("clicked down with pencil")
            break    

        case "bucket":
            bucket(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop, drawColor)
            if(event.clientX - canvas.offsetLeft >= 0 && event.clientX - canvas.offsetLeft < canvas.width &&
                event.clientY - canvas.offsetTop >= 0 && event.clientY - canvas.offsetTop < canvas.height)
            {
                addToHistory()
            }
            break

        case "eraser":
            startErasing(event);
            console.log("clicked down with eraser")
            break    

        case "zoom":
            console.log("clicked down with zoom")
            break   
        
        default:
            console.log("ERROR: tool not selected")
    }
}

function drawMouse(event) {
    switch (toolInUse) {
        case "brush":
            if (isDrawing) {
                drawingDesktop(event)
            }
            break

        case "spray":
            console.log("dragged with spray")
            break

        case "pencil":
            console.log("dragged with pencil")
            break  

        case "bucket":
            break

        case "eraser":
            erasing(event);
            console.log("dragged with eraser")
            break    

        case "zoom":
            console.log("dragged with zoom")
            break       
        
        default:
            console.log("ERROR: tool not selected")
    } 
}

function stopMouse(event) {
    switch (toolInUse) {
        case "brush":
            if (isDrawing) {
                stopDrawingDesktop(event)
                isDrawing = false

                addToHistory()
            }
            break

        case "spray":
            console.log("released with spray")
            break

        case "pencil":
            console.log("released  with pencil")
            break  

        case "bucket":
            break

        case "eraser":
            stopErasing();
            console.log("released with eraser")
            break    

        case "zoom":
            console.log("released  with zoom")
            break       
        
        default:
            console.log("ERROR: tool not selected")
    }
}

//for touch screen

function startTouch(event) {
    switch (toolInUse) {
        case "brush":
            isDrawing = true
            startDrawingMobile(event)
            break

        case "spray":
            console.log("clicked down with spray")
            break

        case "pencil":
            console.log("clicked down with pencil")
            break  

        case "bucket":
            let clientX, clientY
            clientX = Math.round(event.touches[0].clientX)
            clientY = Math.round(event.touches[0].clientY)

            bucket(clientX - canvas.offsetLeft, clientY - canvas.offsetTop, drawColor)
            if(clientX - canvas.offsetLeft >= 0 && clientX - canvas.offsetLeft < canvas.width &&
                clientY - canvas.offsetTop >= 0 && clientY - canvas.offsetTop < canvas.height)
            {
                addToHistory()
            }
            break

        case "eraser":
            console.log("clicked down with eraser")
            break    

        case "zoom":
            console.log("clicked down with zoom")
            break 
        
        default:
            console.log("ERROR: tool not selected")
    }
}

function drawTouch(event) {
    switch (toolInUse) {
        case "brush":
            if (isDrawing) {
                drawingMobile(event)
            }
            break

        case "spray":
            console.log("dragged with spray")
            break

        case "pencil":
            console.log("dragged with pencil")
            break  

        case "bucket":
            break

        case "eraser":
            console.log("dragged with eraser")
            break    

        case "zoom":
            console.log("dragged with zoom")
            break       
        
        default:
            console.log("ERROR: tool not selected")
    } 
}

function stopTouch(event) {
    switch (toolInUse) {
        case "brush":
            if (isDrawing) {
                stopDrawingMobile(event)
                isDrawing = false;

                addToHistory()
            }
            break

        case "spray":
            console.log("released with spray")
            break

        case "pencil":
            console.log("released  with pencil")
            break  

        case "bucket":
            break

        case "eraser":
            console.log("released with eraser")
            break    

        case "zoom":
            console.log("released  with zoom")
            break       
        
        default:
            console.log("ERROR: tool not selected")
    } 
}
