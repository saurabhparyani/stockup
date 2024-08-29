"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.productSchema = zod_1.default.object({
    productId: zod_1.default.string().optional(),
    name: zod_1.default.string().min(3, { message: "Name has to be a minimum of 3 characters" }),
    price: zod_1.default.number().min(1, { message: "Insufficient Price" }),
    stockQuantity: zod_1.default.number().min(1, { message: "Minimum quantity required: 1" }),
    rating: zod_1.default.number().min(1, { message: "Rating has to be a minimum of 1" }).max(5, { message: "Rating has to be a maximum of 5" }).optional()
});
