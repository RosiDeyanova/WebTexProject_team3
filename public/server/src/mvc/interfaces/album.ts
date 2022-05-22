export interface IAlbum {
    userId: string;
    imgBase64: string
};

export interface IStudentsData {
    students: Array<IAlbum>;
}