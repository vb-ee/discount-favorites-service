import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import * as consumers from './consumers'
import { errorHandler } from './middlewares/errorHandler'

export const startApp = () => {
    const app = express()
    const port = 8080

    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(require('./controllers/routes'))

    for (const consumer in consumers) consumer

    app.use(errorHandler)
    app.listen(port, '0.0.0.0', () => {
        console.info(`Favorites service listening on port ${port}`)
    })
}
