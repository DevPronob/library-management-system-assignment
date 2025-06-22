import { Types } from "mongoose";
import { ObjectId } from "mongoose";

export interface IBorrowBook {
    book:Types.ObjectId,
    quantity:number,
    dueDate: Date,
} 
