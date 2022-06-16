import mongoose from "mongoose";
import Album from "../models/albums"

    exports.findAlbumByUserId=function() {
        return await Album.find({userId:this.getIP()}).exec();
    }

    exports.addAlbum=function(imgBase64) {
        const album = new Album({imgBase64:imgBase64, userId:this.getIP()})
        await Album.create(album);
    }

    exports.deleteAlbumData=function(){
       await Album.deleteOne({userId:this.getIP()}).exec();
    }

    getIP()
    {
        $.getJSON("https://api.ipify.org?format=json", function(data){
            return data.ip;
        });
    }

