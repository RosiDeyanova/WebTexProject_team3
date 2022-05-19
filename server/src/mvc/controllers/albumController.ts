import mongoose from "mongoose";
import {IAlbum} from "../interfaces/album";
import Album, { AlbumDocument } from "../models/albums";

export default class AlbumsController {
    constructor() {}

    public async getAlbumsData(): Promise<AlbumDocument[]> {
        return await Album.find({});
    }

    public async findAlbumByUserId(userId: string): Promise<AlbumDocument[]> {
        return await Album.find({userId});
    }

    public async addAlbum(album: IAlbum): Promise<AlbumDocument> {
        const newAlbum: AlbumDocument = new Album({
            _id: new mongoose.Types.ObjectId(),
            ...album
        });

        return await newAlbum.save();
    }

    public async updateAlbumData(userId: string, AlbumData: IAlbum): Promise<boolean> {
        const res = await Album.updateOne(
            {userId},
            { ...AlbumData }
        );

        return res.acknowledged;
    }

    public async deleteAlbumData(userId: string): Promise<number> {
        const res = await Album.deleteOne({userId});
        
        return res.deletedCount;
    }
}