const brushSize = document.getElementById("brush-size"); 

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var isMoving = false;
var eraserColor;
var erasingIsOn = false;

// DESKTOP:

function changeColor(colorElement) 
{
    eraserColor = colorElement;
}

const colorPickerDesktop = document.getElementById("color-picker-desktop");
colorPickerDesktop.oninput = function () 
{
    eraserColor = colorPickerDesktop.value;
}

const desktopBlackColor = document.getElementById("desktop-black");
desktopBlackColor.addEventListener("contextmenu", event => 
{
    event.preventDefault(); // remove auto context menu
    changeColor("black");
    colorPickerDesktop.value = "#000000"; 
});

const basicGrayColor = document.getElementById("desktop-gray")
basicGrayColor.addEventListener("contextmenu", event => 
{
    event.preventDefault();
    changeColor("gray");
    colorPickerDesktop.value = "#888888";
});

const basicDarkRedColor = document.getElementById("desktop-dark-red")
basicDarkRedColor.addEventListener("contextmenu", event => 
{
    event.preventDefault();
    changeColor("#8B0000");
    colorPickerDesktop.value = "#8B0000";
});

const basicRedColor = document.getElementById("desktop-red")
basicRedColor.addEventListener("contextmenu", event => 
{
    event.preventDefault();
    changeColor("red");
    colorPickerDesktop.value = "#FF0000";
});

const basicOrangeColor = document.getElementById("desktop-orange")
basicOrangeColor.addEventListener("contextmenu", event => 
{
    event.preventDefault();
    changeColor("orange");
    colorPickerDesktop.value = "#FFA500";
});

const basicYellowColor = document.getElementById("desktop-yellow")
basicYellowColor.addEventListener("contextmenu", event => 
{
    event.preventDefault();
    changeColor("yellow");
    colorPickerDesktop.value = "#FFFF00";
});

const basicWhiteColor = document.getElementById("desktop-white")
basicWhiteColor.addEventListener("contextmenu", event => 
{
    event.preventDefault();
    changeColor("white");
    colorPickerDesktop.value = "#FFFFFF";
});

const basicPurpleColor = document.getElementById("desktop-purple")
basicPurpleColor.addEventListener("contextmenu", event => 
{
    event.preventDefault();
    changeColor("purple");
    colorPickerDesktop.value = "#800080";
});

const basicDarkBlueColor = document.getElementById("desktop-dark-blue")
basicDarkBlueColor.addEventListener("contextmenu", event => 
{
    event.preventDefault();
    changeColor("#00008b");
    colorPickerDesktop.value = "#00008B";
});

const basicBlueColor = document.getElementById("desktop-blue")
basicBlueColor.addEventListener("contextmenu", event => 
{
    event.preventDefault();
    changeColor("rgb(0, 0, 255)");
    colorPickerDesktop.value = "rgb(0, 0, 255)";
});

const basicGreenColor = document.getElementById("desktop-green")
basicGreenColor.addEventListener("contextmenu", event => 
{
    event.preventDefault();
    changeColor("green")
    colorPickerDesktop.value = "#008000"
});

const basicLimeColor = document.getElementById("desktop-lime")
basicLimeColor.addEventListener("contextmenu", event => 
{
    event.preventDefault();
    changeColor("#00FF00")
    colorPickerDesktop.value = "#00FF00"
});

export function startErasing(event) // mouse is down - called in switch
{
    isMoving = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

export function stopErasing() // mouse is up - called in switch
{
    isMoving = false;
    context.closePath();
}

export function erasing(event) // mousemove - switch
{
    if (isMoving) 
        {
			context.strokeStyle = eraserColor;
            context.lineWidth = brushSize.value;
            context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);

            if(erasingIsOn == true)
            {
              context.globalCompositeOperation="destination-out"; // destination image is shown (eraser), source image is transparent (brush)
            }

            else
            {
              context.globalCompositeOperation="source-over"; // destination image out of the source image
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


// MOBILE:

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
