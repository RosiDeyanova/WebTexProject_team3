const canvas = document.getElementById('canvas'); 
const context = canvas.getContext('2d'); 
const img = document.createElement('img'); 

var classPics = document.getElementsByClassName("pictures"); // all pictures in album

for (var i = 0; i < classPics.length; i++)
{
    // [0] - first picture, [1] - second picture...
    if(classPics[i]) // not null check
    {
        classPics[i].addEventListener("click", bindClick(i)); // if picture is chosen
    }
}

function bindClick(i)
{
    return function()
    {
        img.src = classPics[i].src; // url of new picture is the url of the clicked picture (style.backgroundImage)
        img.onload = () => 
        {    
            context.drawImage(img, 0, 0); // put image on canvas with coordinates 0,0
        };
    }
}





