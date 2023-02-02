import express from 'express'
import {
    getFavorites,
    addToFavorites,
    deleteFromFavorites
} from './FavoritesController'
import { authHandler, Tokens } from '@payhasly-discount/common'

const router = express.Router()

router
    .route('/favorites')
    .get(getFavorites)
    .post(authHandler(Tokens.accessToken, 'JWT_ACCESS'), addToFavorites)
    .delete(authHandler(Tokens.accessToken, 'JWT_ACCESS'), deleteFromFavorites)

export = router
