import { context, canvas, drawColor, drawWidth } from './drawing logic.js'

//desktop

export function startDrawingDesktop(event) {
    context.beginPath()
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
}

export function drawingDesktop(event) {
    context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
    context.strokeStyle = drawColor
    context.lineWidth = drawWidth
    context.lineCap = "round"
    context.lineJoin = "round"
    context.stroke()
}

export function stopDrawingDesktop(event) {
    context.stroke()
    context.closePath()
}

//mobile

let clientX, clientY //seems like for touchscreen there is an array of clientX/Ys so we take only the first one
export function startDrawingMobile(event) {
    clientX = event.touches[0].clientX
    clientY = event.touches[0].clientY
    context.beginPath()
    context.moveTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop)
}

export function drawingMobile(event) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
    context.lineTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop)
    context.strokeStyle = drawColor
    context.lineWidth = drawWidth
    context.lineCap = "round"
    context.lineJoin = "round"
    context.stroke()
}

export function stopDrawingMobile(event) {
    context.stroke()
    context.closePath()
}