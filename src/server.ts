import { startApp } from './startApp'
import { initConnection } from './db/initConnection'

initConnection()
    .then(() => {
        startApp()
    })
    .catch((err) => console.error(err))
