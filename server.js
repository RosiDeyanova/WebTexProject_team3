const express = require('express');
const {join} = require('path'); // to join paths
const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const app = express(); // create application from express
const port = 3000;
const cwd = process.cwd(); // current working directory

app.use(express.json()); // middleware to parse json request body (req.body !== undefined)
app.use(express.urlencoded({extended: false,limit: '50mb'}));
app.use(express.static('public')) // serve the static files

app.listen(port); // choose on which port to listen

const index = join(cwd, 'public', 'index.html'); // path to index.html
// (file needs to be with the name "index.html")


mongoose.connect("mongodb+srv://root:root@cluster0.8eazs.mongodb.net/CloudPaint?retryWrites=true&w=majority").then(res => {
    console.log("Connected to DB");
});

const AlbumSchema = new Schema({
    /* userId: String,
    imgBase64: String */
    userId: {
        type: String,
        required: [true, 'userId is required field!']
    },
    imgBase64: {
        type: String,
        required: [true, 'imgBase64 is required field!']

    }
});

const Album = mongoose.model('Album', AlbumSchema);

findAlbumByUserId = async function (userId) {
    return await Album.find({userId: userId}).exec();
}

addAlbum = async function (imgBase64, userId) {

    const album = new Album({imgBase64: imgBase64, userId: userId});
    console.log("album", album);
    await Album.create(album);
}

deleteAlbumData = async function (userId) {
    await Album.deleteOne({userId: userId}).exec();
}

app.post('/saveToDb', function (req, res) {
    const encodedImg = req.body.img;
    const ip = req.ip;
    addAlbum(encodedImg, ip);
    res.status(200).send();
});

app.get('/getFromDb', async function (req, res) {
   const images = await findAlbumByUserId(req.ip);
   const imgBase64 = [];
   images.forEach(element => {
        imgBase64.push(element.imgBase64);
    });
    res.status(200).json({image:imgBase64})
});


