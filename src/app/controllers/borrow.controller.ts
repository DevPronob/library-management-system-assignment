import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { BorrowBook } from "../models/borrow.model";
import { z } from "zod";

export const BorrowBookRouter = express.Router();

BorrowBookRouter.post("/", async (req: Request, res: Response):Promise<any> => {
 try {
    const body = req.body;
    const book = await Book.findById(body.book);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book Not Found" });
    }
console.log(book)
    if (book.copies < body.quantity) {
      return res.status(404).json({
        success: false,
        message: "Not enough copies available",
      });
    }

    await book.decreaseCopies(body.quantity);

    const borrowBook = await BorrowBook.create(body);

    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowBook,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});

BorrowBookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const bookSamary = await BorrowBook.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "booksWithBorrowBook",
        },
      },
      {
        $unwind: "$booksWithBorrowBook",
      },
      {
        $group: {
          _id: "$book",
          book: {
            $push: {
              title: "$booksWithBorrowBook.title",
              isbn: "$booksWithBorrowBook.isbn",
            },
          },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          book: 1,
          totalQuantity: 1,
        },
      },
    ]);

    res
      .status(200)
      .json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: bookSamary,
      });
  } catch (error: any) {
    res.status(400).json({
    message: error.name || 'Error',
    success: false,
    error: error.errors,
  });
  }
});
