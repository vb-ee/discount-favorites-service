import { startApp } from './startApp'
import { initConnection } from './db/initConnection'
import mongoose from 'mongoose'

initConnection()
    .then(() => {
        mongoose.set('strictQuery', false)
        startApp()
    })
    .catch((err) => console.error(err))
