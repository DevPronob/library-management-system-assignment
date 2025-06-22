"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    let message = error.name || "Something went wrong";
    if (error.name === "ValidationError") {
        message = "Validation failed";
    }
    res.status(400).json({
        message,
        success: false,
        error: error,
    });
};
exports.default = errorHandler;
