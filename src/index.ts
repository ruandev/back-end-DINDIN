import express from "express"
require('dotenv').config()
import 'express-async-errors'
import { AppDataSource } from './data-source'
import routes from './routes'
import cors from 'cors'

AppDataSource.initialize().then(() => {
    const port = 3001 || process.env.PORT
    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use(routes)


    console.log(`Express server has started on port ${process.env.PORT}`)
    return app.listen(port)
}).catch(error => console.log(error))
