import express from 'express'
import {
    getFavorites,
    addToFavorites,
    deleteFromFavorites
} from './FavoritesController'
import { authHandler, Tokens } from '@payhasly-discount/common'

const router = express.Router()

router.use(authHandler(Tokens.accessToken, 'JWT_ACCESS'))
router
    .route('/favorites')
    .get(getFavorites)
    .post(addToFavorites)
    .delete(deleteFromFavorites)

export = router
