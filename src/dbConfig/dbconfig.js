import mongoose from "mongoose";

export async function Connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const connection =  mongoose.connection
        connection.on('Connected', ()=>{
            console.log("Databese connected Succesfully")
        })
        connection.on('error',(error)=>{
            console.log("Somthing went wrong in database connection",error)
            process.exit()
        })
        
    } catch (error) {
        console.log("Connection was not successfull",error)
    }
    
}