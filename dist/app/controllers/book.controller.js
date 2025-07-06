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
exports.booksouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksouter = express_1.default.Router();
exports.booksouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
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
exports.booksouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = req.query.filter;
    const limit = req.query.limit || 10;
    const sortBy = req.query.sortBy;
    const sort = req.query.sort;
    try {
        const query = {};
        if (genre)
            query.genre = genre;
        const sortOption = sortBy ? { [sortBy]: sort === "desc" ? -1 : 1 } : {};
        const books = yield book_model_1.Book.find(query)
            .sort(sortOption)
            .limit(Number(limit));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.name || 'Error',
            success: false,
            error: error,
        });
    }
}));
exports.booksouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.find({ _id: req.params.bookId });
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
    }
    catch (error) {
        res.status(400).json({
            message: error.name || 'Error',
            success: false,
            error: error,
        });
    }
}));
exports.booksouter.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
        });
        if (book.copies > 1) {
            const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, { available: true }, {
                new: true,
            });
        }
        else if (book.copies < 1) {
            const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, { available: false }, {
                new: true,
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.name || 'Error',
            success: false,
            error: error,
        });
    }
}));
exports.booksouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.name || 'Error',
            error: error,
        });
    }
}));
