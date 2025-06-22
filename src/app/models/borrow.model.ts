import mongoose, { Schema } from "mongoose";
import { IBorrowBook } from "../interfaces/borrowBook.interface";

const borrowBookSchema = new Schema<IBorrowBook>({
  book: { type: Schema.Types.ObjectId,ref: "Book", required: [true,"Book is Required"], trim: true },
  quantity: { type: Number,required: [true,"Quantity is Required"]},
  dueDate: { type: Date, required: [true,"DueDate is Required"]},
  
},{ timestamps: true,versionKey:false});
export const BorrowBook = mongoose.model("BorrowBook", borrowBookSchema);