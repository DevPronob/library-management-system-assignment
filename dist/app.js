"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://library-frontend-devpronobs-projects.vercel.app',
        'https://library-frontend-black.vercel.app'
    ],
    credentials: true
}));
app.use(express_1.default.json());
app.use('/api/books', book_controller_1.booksouter);
app.use('/api/borrow', borrow_controller_1.BorrowBookRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
exports.default = app;
