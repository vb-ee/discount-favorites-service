import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { IDiscount } from '../models/Discount'
import { Favorite } from '../models/Favorite'

export const getFavorites = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.payload
        const favorites = await Favorite.find({ userId: id }).populate(
            'discount'
        )
        let discounts: IDiscount[] = []
        favorites.forEach((favorite) => {
            discounts.push(<IDiscount>favorite['discount'])
        })
        res.status(200).send({ discounts })
    }
)

export const addToFavorites = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.payload
        const { discountId } = req.query

        if (!discountId)
            res.status(400).send({
                msg: 'discountId has to be defined in query params'
            })

        const favorite = await Favorite.findOne({ userId: id, discountId })
        if (favorite)
            res.status(400).send({
                msg: `discount with id ${discountId} already in favorites`
            })
        else await Favorite.create({ userId: id, discountId })

        res.status(204).end()
    }
)

export const deleteFromFavorites = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.payload
        const { discountId } = req.query

        if (!discountId)
            res.status(400).send({
                msg: 'discountId has to be defined in query params'
            })

        const favorite = await Favorite.findOneAndDelete({
            userId: id,
            discountId
        })

        if (!favorite)
            res.status(404).send({
                msg: `favorite discount with id ${discountId} does not exist for this user`
            })

        res.status(204).end()
    }
)
