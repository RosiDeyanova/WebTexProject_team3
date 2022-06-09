const canvas = document.getElementById('canvas'); 
const context = canvas.getContext('2d'); 
const img = new Image(); 

var classPics = document.getElementsByClassName("pictures"); // all pictures in album

for (var i = 0; i < classPics.length; i++)
{
    // [0] - first pic, [1] - second pic...
    if(classPics[i]) // not null check
    {
        classPics[i].addEventListener("click", bindClick(i));
    }
}

function bindClick(i)
{
    return function()
    {
        img.src = classPics[i].src;        
        img.onload = () => 
        {    
            context.drawImage(img, 0, 0);
        };
        //TODO: auto clear canvas after each chosen pic?
    }
}





