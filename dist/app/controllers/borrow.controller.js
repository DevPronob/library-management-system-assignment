"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.BorrowBookRouter = express_1.default.Router();
exports.BorrowBookRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.findById(body.book);
        if (book) {
            yield book.decreaseCopies(req.body.quantity);
            if (book.copies < body.quantity) {
                res.status(404).json({
                    success: false,
                    message: "Not enough copies available",
                });
            }
            const borrowBook = yield borrow_model_1.BorrowBook.create(req.body);
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrowBook,
            });
        }
        else {
            res.status(404).json({ success: false, message: "Book Not Found" });
        }
    }
    catch (error) {
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
}));
exports.BorrowBookRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookSamary = yield borrow_model_1.BorrowBook.aggregate([
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
    }
    catch (error) {
        res.status(400).json({
            message: error.name || 'Error',
            success: false,
            error: error.errors,
        });
    }
}));
