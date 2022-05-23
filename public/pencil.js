import { context, canvas, drawColor } from './drawing logic.js'

//for mouse
export function startMouse(event) {
   
    context.beginPath()
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop) //event.clientX/Y are mouse coordinates and we offset them to be relative to the canvas
}

export function drawMouse(event) {
    
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
        context.strokeStyle = drawColor
        context.lineWidth = "2"
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









