import { Request, Response } from "express"
import { categoryRepository } from '../repositories/categoryRepository'

export class CategoryController {
    async categories(req: Request, res: Response) {
        try {
            const categories = await categoryRepository.find()
            return res.status(200).json(categories)

        } catch (e: any) {
            return res.status(500).json(e)
        }
    }
}