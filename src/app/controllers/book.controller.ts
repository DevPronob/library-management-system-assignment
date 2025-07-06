import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { z } from "zod";
export const booksouter = express.Router();



booksouter.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const body = req.body;
    const book = await Book.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
       res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: error.errors,
      });
    }
    res.status(400).json({
    message: error.name || 'Error',
    success: false,
   error: error,
  });

  } 
});

booksouter.get("/", async (req: Request, res: Response) => {
  const genre = req.query.filter;
  const limit = req.query.limit;
  const sortBy = req.query.sortBy;
  const sort =req.query.sort
  try {
   const query: any = {};
    if (genre) query.genre = genre;

    const sortOption = sortBy ? { [sortBy as string]: sort === "desc" ? -1 : 1 } : {};

    const books = await Book.find(query)
      .sort(sortOption as any)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
     res.status(400).json({
    message: error.name || 'Error',
     success: false,
    error: error,
  });
  }
});
booksouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.find({ _id: req.params.bookId });
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
      res.status(400).json({
    message: error.name || 'Error',
    success: false,
    error: error,
  });
  }
});

booksouter.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });

    if ((book as any).copies >1) {
       const book = await Book.findByIdAndUpdate(req.params.bookId, {available:true}, {
      new: true,
    })
      }else if((book as any).copies <1){
         const book = await Book.findByIdAndUpdate(req.params.bookId, {available:false}, {
      new: true,
    })
      }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
     res.status(400).json({
    message: error.name || 'Error',
    success: false,
    error: error,
  });
  }
});

booksouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
     res.status(400).json({
      success: false,
    message: error.name || 'Error',
    error: error,
  });
  }
});
