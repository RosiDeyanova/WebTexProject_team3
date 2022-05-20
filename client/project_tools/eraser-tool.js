const brushSize = document.getElementById("brush-size"); 

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var isMoving = false;
var eraserColor = "#FFFFFF"; // canvas color -> TODO: choose color with right click
var erasingIsOn = false;


const basicRedColor = document.getElementById("desktop-red");
basicRedColor.addEventListener("contextmenu", event =>
{
    eraserColor = basicRedColor.style.background; // TODO: delete inline style
});

export function startErasing(event)
{
    isMoving = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
}

export function stopErasing()
{
    isMoving = false;
    context.closePath();
}

export function erasing(event)
{
    if (isMoving) 
        {
			context.strokeStyle = eraserColor;
            context.lineWidth = brushSize.value;
            context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);

            if(erasingIsOn == true)
            {
              context.globalCompositeOperation="destination-out";
            }

            else
            {
              context.globalCompositeOperation="source-over"; 
            }

            context.stroke();
        }  
}

const bucket_desktop = document.getElementById("bucket-desktop");
const zoom_desktop = document.getElementById("zoom-desktop");
const brush_desktop = document.getElementById("brush-desktop");
const spray_desktop = document.getElementById("spray-desktop");
const pencil_desktop = document.getElementById("pencil-desktop");

// stop using eraser when other tool is clicked

bucket_desktop.addEventListener("click", turnEraserOff);
zoom_desktop.addEventListener("click", turnEraserOff);
brush_desktop.addEventListener("click", turnEraserOff);
spray_desktop.addEventListener("click", turnEraserOff);
pencil_desktop.addEventListener("click", turnEraserOff);

function turnEraserOff()
{
    erasingIsOn = false;
}


// MOBILE: - TODO: fix gray color

const eraser_mobile = document.getElementById("eraser-mobile");

eraser_mobile.addEventListener("click", function()
{
    eraserColor = "#fa0000"
    erasingIsOn = true;
    let clientX, clientY;

    canvas.addEventListener("touchstart", function(event) // start touching the screen - drawing with eraser starts
    {
        isMoving = true;

        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
        context.beginPath();
        context.moveTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
    });
    
    canvas.addEventListener("touchend", function() // stop touching the screen - drawing with eraser stops
    {
        isMoving = false;
        console.log("touch ended");
        context.closePath();
    });

    canvas.addEventListener("touchmove", event => // draws with eraser between touching screen and stop touching screen
    {
        if (isMoving) 
        {
			context.strokeStyle = "#fa0000";
            context.lineWidth = brushSize.value;

            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
            context.lineTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);

            // https://www.w3schools.com/tags/canvas_globalcompositeoperation.asp

            if(erasingIsOn == true)
            {
              context.globalCompositeOperation="destination-out"; // erases over the drawing
            }

            else
            {
              context.globalCompositeOperation="source-over";
            }

            context.stroke();
        }  
    });
});


// stop using eraser when other tool is clicked
const brush = document.getElementById("brush-mobile");
brush.addEventListener("click", turnEraserOff);

/*
const bucket = document.getElementById("bucket-mobile");
const zoom = document.getElementById("zoom-mobile");
const brush = document.getElementById("brush-mobile");
const spray = document.getElementById("spray-mobile");
const pencil = document.getElementById("pencil-mobile");


bucket.addEventListener("click", turnEraserOff);
zoom.addEventListener("click", turnEraserOff);
brush.addEventListener("click", turnEraserOff);
spray.addEventListener("click", turnEraserOff);
pencil.addEventListener("click", turnEraserOff); 
*/