const image_input = document.getElementById("image-input");

image_input.addEventListener("change", function() 
{
  const reader = new FileReader(); //
  reader.addEventListener("load", () => 
  {
    // show picture in the rectangle
    const uploaded_image = reader.result;
    var url =  `url(${uploaded_image})`;
    document.getElementById("display-image").style.backgroundImage = url;

    // add uploaded picture to album
    var newPic = document.createElement("div");
    newPic.style.width = "300px";
    newPic.style.height = "225px";
    newPic.style.backgroundPosition = "center";
    newPic.style.backgroundSize = "cover";
    newPic.style.backgroundImage = url;
    document.getElementById("album-pictures").appendChild(newPic);
  });
  
  reader.readAsDataURL(this.files[0]); //

});