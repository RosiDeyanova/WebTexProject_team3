import { context, canvas } from './drawing logic.js'

let mask

export function bucket(x, y, bucketColor)
{
    mask = new Array(canvas.height) //each mask element/pixel can have a value from 0 to 2 (0 mean its the color we are painting over)(1 means its a color we are not painting over)(2 means we already painted over this pixel)

    var pixelData = context.getImageData(x, y, 1, 1)
    var data = pixelData.data
    var originalColor = "rgb(" + data[0] + ", " + data[1] +", " + data[2] + ", " +data[3] + ")" //takes color of current pixel

    //sets the starting values of the mask to be all 0
    for(let i = 0; i < canvas.height; i++) {
        mask[i] = []
        for(let j = 0; j < canvas.width; j++) {
            mask[i][j] = 0
        }
    }

    getDrawings(originalColor) //wherever the color is different from the one we are painting over its sets the values to 1

    //we divide the img into chunks and use a flood algorithm on each
    //chunk to prevent a stack overflow if we use it on the whole img
    var chunk = {x: Math.floor(x / 50) * 50, y: Math.floor(y / 50) * 50} 

    floodMask(x, y, chunk) //marks the part that we need to paint over with the value of 2
    
    let thereArePixelsToFill = true
    while(thereArePixelsToFill)
    {
        thereArePixelsToFill = false //if a flood is ever called it becomes true

        //goes from top left to bottom down. Has the side effect that if it fills a chunk it will likely fill its left and bottom neighbor and then their neighbors and so on
        for(let o = 0; o < canvas.width; o+=50) {
            for(let p = 0; p < canvas.height; p +=50) {

                chunk = {x: o, y: p}

                //checks if the top border of the chunk has any pixels with the value of 0 are neighboring pixels with the value of 2. If so floods the chunk
                if(chunk.y > 0) { //check top
                    for(let i = 0; i < 50; i++) 
                    {
                        if(chunk.x + i < canvas.width)
                        {
                            if(mask[chunk.y - 1][chunk.x + i] == 2 && mask[chunk.y][chunk.x + i] == 0)
                            {
                                thereArePixelsToFill = true
                                floodMask(chunk.x + i, chunk.y, {x: chunk.x, y: chunk.y})
                            }
                        }
                    }
                }
            
                //checks if the bottom border of the chunk has any pixels with the value of 0 are neighboring pixels with the value of 2. If so floods the chunk
                if(chunk.y < canvas.height - 50) { //check bottom
                    for(let i = 0; i < 50; i++) 
                    {
                        if(chunk.x + i < canvas.width)
                        {
                            if(mask[chunk.y + 50][chunk.x + i] == 2 && mask[chunk.y + 49][chunk.x + i] == 0)
                            {
                                thereArePixelsToFill = true
                                floodMask(chunk.x + i, chunk.y + 49, {x: chunk.x, y: chunk.y})
                            }
                        }
                    }
                }
            
                //checks if the left border of the chunk has any pixels with the value of 0 are neighboring pixels with the value of 2. If so floods the chunk
                if(chunk.x > 0) { //check left
                    for(let i = 0; i < 50; i++) 
                    {
                        if(chunk.y + i < canvas.height)
                        {
                            if(mask[chunk.y + i][chunk.x - 1] == 2 && mask[chunk.y + i][chunk.x] == 0)
                            {
                                thereArePixelsToFill = true
                                floodMask(chunk.x, chunk.y + i, {x: chunk.x, y: chunk.y})
                            }
                        }
                    }
                }
            
                //checks if the right border of the chunk has any pixels with the value of 0 are neighboring pixels with the value of 2. If so floods the chunk
                if(chunk.x < canvas.width - 50) { //check right
                    for(let i = 0; i < 50; i++) 
                    {
                        if(chunk.y + i < canvas.height)
                        {
                            if(mask[chunk.y + i][chunk.x + 50] == 2 && mask[chunk.y + i][chunk.x + 49] == 0)
                            {
                                thereArePixelsToFill = true
                                floodMask(chunk.x + 49, chunk.y + i, {x: chunk.x, y: chunk.y})
                            }
                        }
                    }
                }
            }
        }
        
        //same as above but going from bottom left to top right. The idea is that in a lot of cases this way 1 loop will be enough to color the whole thing
        for(let o = Math.floor(canvas.width/50) * 50; o >= 0; o-=50) {
            for(let p = Math.floor(canvas.height/50) * 50; p >= 0; p-=50) {

                chunk = {x: o, y: p}

                if(chunk.y > 0) { //check top
                    for(let i = 0; i < 50; i++) 
                    {
                        if(chunk.x + i < canvas.width && chunk.y < canvas.height)
                        {
                            if(mask[chunk.y - 1][chunk.x + i] == 2 && mask[chunk.y][chunk.x + i] == 0)
                            {
                                thereArePixelsToFill = true
                                floodMask(chunk.x + i, chunk.y, {x: chunk.x, y: chunk.y})
                            }
                        }
                    }
                }
            
                if(chunk.y < canvas.height - 50) { //check bottom
                    for(let i = 0; i < 50; i++) 
                    {
                        if(chunk.x + i < canvas.width)
                        {
                            if(mask[chunk.y + 50][chunk.x + i] == 2 && mask[chunk.y + 49][chunk.x + i] == 0)
                            {
                                thereArePixelsToFill = true
                                floodMask(chunk.x + i, chunk.y + 49, {x: chunk.x, y: chunk.y})
                            }
                        }
                    }
                }
            
                if(chunk.x > 0) { //check left
                    for(let i = 0; i < 50; i++) 
                    {
                        if(chunk.y + i < canvas.height)
                        {
                            if(mask[chunk.y + i][chunk.x - 1] == 2 && mask[chunk.y + i][chunk.x] == 0)
                            {
                                thereArePixelsToFill = true
                                floodMask(chunk.x, chunk.y + i, {x: chunk.x, y: chunk.y})
                            }
                        }
                    }
                }
            
                if(chunk.x < canvas.width - 50) { //check right
                    for(let i = 0; i < 50; i++) 
                    {
                        if(chunk.y + i < canvas.height)
                        {
                            if(mask[chunk.y + i][chunk.x + 50] == 2 && mask[chunk.y + i][chunk.x + 49] == 0)
                            {
                                thereArePixelsToFill = true
                                floodMask(chunk.x + 49, chunk.y + i, {x: chunk.x, y: chunk.y})
                            }
                        }
                    }
                }
            }
        }
    }

    //paints over the pixels with a value of 2
    fillMask(bucketColor)

}

function getDrawings(originalColor) //original color is the color of the pixel we clicked on with the cursor while using the bucket
{
    
    var pixelData, data, pixelColor

    for(let i = 0; i < canvas.width; i++) {
        for(let j = 0; j < canvas.height; j++) {
            pixelData = context.getImageData(i, j, 1, 1)
            data = pixelData.data
            pixelColor = "rgb(" + data[0] + ", " + data[1] +", " + data[2] + ", " + data[3] + ")"

            if(pixelColor !== originalColor) {
                mask[j][i] = 1 //i and j are swapped because coordinates from the canvas and j is for the height and i is for the width
            }
        }
    }
}

function floodMask(x, y, chunk)
{
    //return if we go outside of the canvas
    if(x >= canvas.width || y >= canvas.height) 
    {
        return 
    }
    if(x < 0 || y < 0) 
    {
        return 
    }

    //return if we gou outside of the chunk
    if(x >= chunk.x + 50 || y >= chunk.y + 50)
    {
        return
    }
    if(x < chunk.x || y < chunk.y)
    {
        return
    }

    //return if we have gone over this pixel already or is another color
    if(mask[y][x] != 0)
    {
        return
    }

    mask[y][x] = 2 //marks pixels that we will paint over with the value of 2

    floodMask(x + 1, y, chunk)
    floodMask(x, y + 1, chunk)
    floodMask(x - 1, y, chunk)
    floodMask(x, y - 1, chunk)
}

//paints over the pixels marked in the mask with value 2
function fillMask(bucketColor)
{
    for(let i = 0; i < canvas.width; i++) {
        for(let j = 0; j < canvas.height; j++) {
            if(mask[j][i] == 2) { //we swap i and j places so that they move the coordinates the same way as x and y (j needs to go vetical and i needs to go horizontal)
                context.fillStyle = bucketColor
                context.fillRect(i, j, 1, 1)
            }
        }
    }
}


