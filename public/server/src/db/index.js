import * as mongoose from "mongoose";

const connectDb = () => {
    return mongoose.connect("mongodb+srv://root:root@cluster0.8eazs.mongodb.net/CloudPaint?retryWrites=true&w=majority");
}

export default connectDb;