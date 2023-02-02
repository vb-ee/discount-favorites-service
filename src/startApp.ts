import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

export const startApp = () => {
    const app = express()
    const port = 8080

    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(require('./controllers/routes'))

    app.listen(port, '0.0.0.0', () => {
        console.info(`Favorites service listening on port ${port}`)
    })
}
