import { context, canvas, drawColor, drawWidth } from './drawing logic.js'



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
let usingPencil = false  //when using pencil we can not use the size menu 



//for mouse
export function startMouse(event) {
   
    context.beginPath()
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop) //event.clientX/Y are mouse coordinates and we offset them to be relative to the canvas
}

export function drawMouse(event) {
    
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
        context.strokeStyle = drawColor
        context.lineWidth = drawWidth
        context.lineCap = "round"
        context.lineJoin = "round"
        context.stroke()
    
}

export function stopMouse(event) {
    
        context.stroke()
        context.closePath()
       
    
}

//for touch screen
let clientX, clientY; //seems like for touchscreen there is an array of clientX/Ys so we take only the first one

export function startTouch(event) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
    context.beginPath()
    context.moveTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop)
}

export function drawTouch(event) {
    
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
        context.lineTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop)
        context.strokeStyle = drawColor
        context.lineWidth = drawWidth
        context.lineCap = "round"
        context.lineJoin = "round"
        context.stroke()

}

export function stopTouch(event) {
   
        context.stroke()
        context.closePath()
}



//pencil 

const pencil = document.getElementById("pencil-desktop")
pencil.onclick = function () {
   
    
    usingPencil = true
    drawWidth = "2"
}


const pencilMobile = document.getElementById("pencil-mobile")
pencilMobile.onclick = function () {
   
    usingPencil = true
    drawWidth = "2"

   
}









