const image_input = document.getElementById("image-input");

image_input.addEventListener("change", function() 
{
  const reader = new FileReader(); // app reads the contents of file
  reader.addEventListener("load", () => 
  {
    // show picture in the rectangle
    const uploaded_image = reader.result;
        $.post('http://localhost:3000/saveToDb', 
        {
            img: uploaded_image
        });
    var url =  `url(${uploaded_image})`;
    document.getElementById("display-image").style.backgroundImage = url;
    
    // add uploaded picture to album
    var newPic = document.createElement("img");
    newPic.classList.add("pictures");
    newPic.style.width = "300px";
    newPic.style.height = "225px";
    newPic.style.backgroundPosition = "center";
    newPic.style.backgroundSize = "cover";
    newPic.style.backgroundImage = url;
    document.getElementById("album-pictures").appendChild(newPic);
  });
  
  reader.readAsDataURL(this.files[0]); 
});