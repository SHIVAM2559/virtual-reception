import mongoose from "mongoose";

export async function connect(){
    try {
        console.log("connectiong to database");

        await mongoose.connect(process.env.MONGO_URI!);
   

        const connection=mongoose.connection;
        connection.on("Connected",()=>{
            console.log("mongo db connected successfully");
            
        })
        console.log("db side done");
        

    } catch (error:any) {
        console.log("data base connection falied",error);
        
    }
   
    
}