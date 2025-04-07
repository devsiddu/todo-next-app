import mongoose from "mongoose"

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://codephantom:007007007@cluster0.swfua.mongodb.net/todo-app')
    console.log("Db Connected");
    
}