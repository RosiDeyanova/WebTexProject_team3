import  { Document, Model, Schema, model } from 'mongoose'
import { IAlbum } from '../interfaces/album';

export interface AlbumDocument extends IAlbum, Document {
}

export interface AlbumModel extends Model<AlbumDocument> {
}

const AlbumSchema = new Schema({
    userId:{
        type: String,
        required:[true, 'userId is required field!']
    },
    imgBase64:{
        type: String,
        required:[true, 'imgBase64 is required field!'],
        validate:{
            validator: (value) => /^data:image.*$/.test(value),
            message: 'Invalid base64 encoding'
        }
    }
});

const Album = model('Album', AlbumSchema);

export default Album;