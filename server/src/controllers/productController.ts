import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { productSchema } from "../validators/productSchema";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const products = await prisma.products.findMany({
            where: {
                name: {
                    contains: search,
                }
            }
        })
        res.json(products)
    } catch (error) {
        res.status(500).json({"message": "Error fetching products"})
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        // safe parsing
        const parsed = productSchema.safeParse(req.body);

        if(!parsed.success) {
            return res.status(411).json({message: "Inputs are not correct"})
        }

        const {productId, name, price, stockQuantity, rating} = parsed.data;

        const newProduct = await prisma.products.create({
            data: {
                productId: productId || undefined,
                name,
                price,
                stockQuantity,
                rating
            }
        })

        res.status(201).json(newProduct);
        
    } catch (error) {
        res.status(500).json({"message": "Error creating product"})
    }
}