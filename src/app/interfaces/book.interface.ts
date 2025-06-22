import { Model, ObjectId, Types } from "mongoose";

export interface IBooks {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BookCopiesDecreaseMethods extends Model<IBooks> {
  decreaseCopies(quantity: number): Promise<void>;
}

export type IBookModel = Model<IBooks, {}, BookCopiesDecreaseMethods>;
