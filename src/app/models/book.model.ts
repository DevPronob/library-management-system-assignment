import mongoose, { Model, Schema } from "mongoose";
import { BookCopiesDecreaseMethods, IBookModel, IBooks } from "../interfaces/book.interface";

const bookSchema = new Schema<IBooks,IBookModel>({
  title: { type: String, required: [true, "Title is Required"], trim: true },
  author: { type: String, required: [true, "Author is Required"] },
  genre: {
    type: String,
    enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    required: [true, "Genre is Required"]
  }, 
  isbn: { type: String, required: [true, "Isbn is Required"],unique:true },
  description: { type: String },
  copies: { type: Number, required: [true, "Copies are Required"], min: [0, "Copies must be a positive number"] },
  available: { type: Boolean, default: true }
}, {
  timestamps: true,
  versionKey:false
});

// bookSchema.methods("decreaseCopies", async function (quantity: number) {
//   this.copies -= quantity;
//   if (this.copies == 0) {
//     this.available = false;
//   }
//   await this.save();
// });

bookSchema.methods.decreaseCopies =async function(quantity: number) {
  this.copies -= quantity;
   if (this.copies <= 0) {
    this.available = false;
  }
  await this.save();
}


export const Book = mongoose.model<IBooks, IBookModel>("Book", bookSchema);

