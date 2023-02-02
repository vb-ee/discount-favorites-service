import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

export const getFavorites = asyncHandler(
    async (req: Request, res: Response) => {}
)

export const addToFavorites = asyncHandler(
    async (req: Request, res: Response) => {}
)

export const deleteFromFavorites = asyncHandler(
    async (req: Request, res: Response) => {}
)
