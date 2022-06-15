import { context, canvas, noZoomImg} from './drawing logic.js'

let noZoomPixel //variable used to store the image data of one pixel from the non zoomed img
let noZoomData  //variable used to store the color data of one pixel from the non zoomed img
export let scale = 1 //the amount of zoom

//the offset of the top left pixel of the canvas relative to the top left pixel from the whole img
let xOffsetDelta = 0
let yOffsetDelta = 0

//saves the whole img color values into the array noZoomImg
export function setNoZoomImg() { 
        for(let i = 0; i < canvas.height; i++) {
        noZoomImg[i] = []
            for(let j = 0; j < canvas.width; j++) {
                noZoomPixel = context.getImageData(j, i, 1, 1)
                noZoomData = noZoomPixel.data
                noZoomImg[i][j] = "rgb(" + noZoomData[0] + ", " + noZoomData[1] +", " + noZoomData[2] + ", " +noZoomData[3] + ")"
            }
    }
}

//used when we left click with the tool
export function zoomIn(event) {
    scale *= 2 //each time we zoom everything becomes 2 time bigger

    //if we zoom 3 times we zoom out to the whole img again
    if(scale >= 8) {
        for(let i = 0; i < canvas.height; i++) {
            for(let j = 0; j < canvas.width; j++) {  
                context.fillStyle = noZoomImg[i][j]
                context.fillRect(j, i, 1, 1)
            }
        }

        xOffsetDelta = 0
        yOffsetDelta = 0
        scale = 1
        return
    }

    let imgArr = new Array(canvas.height) //each mask element/pixel can have a value from 0 to 2 (0 mean its the color we are painting over)(1 means its a color we are not painting over)(2 means we already painted over this pixel)

    var pixelData
    var data

    //saves the color data of the current canvas
    for(let i = 0; i < canvas.height; i++) {
        imgArr[i] = []
        for(let j = 0; j < canvas.width; j++) {
            pixelData = context.getImageData(j, i, 1, 1)
            data = pixelData.data
            imgArr[i][j] = "rgb(" + data[0] + ", " + data[1] +", " + data[2] + ", " +data[3] + ")"
        }
    }

    //we offset the relative to the whole img or the once zoomed img
    var xOffset = (event.clientX - canvas.offsetLeft)
    var yOffset = (event.clientY - canvas.offsetTop)

    //sets the center of the new canvas to be where we clicked
    xOffset -= Math.floor(canvas.width / 4)
    yOffset -= Math.floor(canvas.height / 4)

    if(xOffset > canvas.width / 2)
        xOffset = canvas.width / 2
    else if(xOffset < 0)
        xOffset = 0

    if(yOffset > canvas.height / 2)
        yOffset = canvas.height / 2
    else if(yOffset < 0)
        yOffset = 0

    //sets the right delta offset (the offset relative to the whole img) needed to keep the new drawing to the img when we zoom out
    if(scale == 2)
    {
        xOffsetDelta += xOffset
        yOffsetDelta += yOffset
    }
    else if(scale == 4)
    {
        xOffsetDelta += Math.floor(xOffset / 2)
        yOffsetDelta += Math.floor(yOffset / 2)
    }

    //draws the new zoomed in canvas
    for(let i = 0; i < canvas.height / 2; i++) {
        for(let j = 0; j < canvas.width / 2; j++) {  
            context.fillStyle = imgArr[i + yOffset][j + xOffset]
            context.fillRect(j * 2, i * 2, 2, 2)
        }
    }
}

//makes the pixels of the new drawing up to scale when we are zoomed in
//changes values in the array holding the color values of the whole img so that what we draw when we are zoomed in is saved in the right location when we zoom out
export function pixelate(scale)
{
    if(scale <= 1)
        return

    let imgArr = new Array(canvas.height)
    var pixelData
    var data

    //gets the color values of the current canvas
    for(let i = 0; i < canvas.height; i++) {
        imgArr[i] = []
        for(let j = 0; j < canvas.width; j++) {
            pixelData = context.getImageData(j, i, 1, 1)
            data = pixelData.data
            imgArr[i][j] = "rgb(" + data[0] + ", " + data[1] +", " + data[2] + ", " +data[3] + ")"
        }
    }

    //makes the pixels of what we drawed up to scale
    for(let i = 0; i < canvas.height; i+=scale) {
        for(let j = 0; j < canvas.width; j+=scale) {  
            context.fillStyle = imgArr[i][j]
            context.fillRect(j , i, scale, scale)
        }
    }

    //saves the changes to the array holding the color values of the whole img
    for(let i = 0; i < canvas.height / scale; i++) {
        for(let j = 0; j < canvas.width / scale; j++) {
            noZoomImg[i + yOffsetDelta][j + xOffsetDelta] = imgArr[i * scale][j * scale]
        }
    }
}