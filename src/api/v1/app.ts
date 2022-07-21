import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import { routes } from './routes'
import { useCors } from './utilities/useCors'

export const app: Application = express()

const { options } = useCors()

app.use(cors(options))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

routes(app)
