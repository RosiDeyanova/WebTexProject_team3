import { context, canvas, drawColor, drawWidth } from './drawing logic.js'

//desktop

let isSpraying = false

export function startDrawingDesktop() {
    isSpraying = true
}

export function drawingDesktop(event) {
    if(!isSpraying)
        return 

    for(let i = 0; i < 3; i++)
    {
        //gets random offset to make it look like spray
        var offsetX = Math.floor(Math.random() * (drawWidth / 2))
        var offsetY = Math.floor(Math.random() * (drawWidth / 2))

        //so that the offset doesnt only go down and right but also left and up
        if(Math.floor(Math.random() * 10) < 5)
            offsetX *= -1

        if(Math.floor(Math.random() * 10) < 5)
            offsetY *= -1

        //drawing to the canvas each pixel of the spray
        context.fillStyle = drawColor
        context.fillRect((event.clientX - canvas.offsetLeft) + offsetX, (event.clientY - canvas.offsetTop) + offsetY, 2, 2)
    }
}

export function stopDrawingDesktop() {
    isSpraying = false
}

//mobile

let clientX, clientY //seems like for touchscreen there is an array of clientX/Ys so we take only the first one
export function startDrawingMobile(event) {
    isSpraying = true
}

export function drawingMobile(event) {
    if(!isSpraying)
        return 

    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;

    for(let i = 0; i < 3; i++)
    {
        //gets random offset to make it look like spray
        var offsetX = Math.floor(Math.random() * (drawWidth / 2))
        var offsetY = Math.floor(Math.random() * (drawWidth / 2))

        //so that the offset doesnt only go down and right but also left and up
        if(Math.floor(Math.random() * 10) < 5)
            offsetX *= -1

        if(Math.floor(Math.random() * 10) < 5)
            offsetY *= -1

        //drawing to the canvas each pixel of the spray
        context.fillStyle = drawColor
        context.fillRect((clientX - canvas.offsetLeft) + offsetX, (clientY - canvas.offsetTop) + offsetY, 2, 2)
    }
}

export function stopDrawingMobile(event) {
    isSpraying = false
}