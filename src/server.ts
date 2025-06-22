import mongoose from "mongoose";
import { Server } from 'http';
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

let server:Server;
async function main() {
   try {
     mongoose.connect(process.env.DB_URL as string)
     server = app.listen(process.env.PORT, () => {
      console.log(`Application is running on port ${process.env.PORT}`);
    });
} catch (error) {
    console.log("MongoDb Server Error",error)
    
} 
}

main()