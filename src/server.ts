import mongoose from "mongoose";
import { Server } from 'http';
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

let server:Server;
async function main() {
   try {
     mongoose.connect("mongodb+srv://pnob9439:aIf1iURTDfSKbJxb@assignment-3.1zjuptl.mongodb.net/?retryWrites=true&w=majority&appName=assignment-3")
     server = app.listen(5000, () => {
      console.log(`Application is running on port ${5000}`);
    });
} catch (error) {
    console.log("MongoDb Server Error",error)
    
} 
}

main()