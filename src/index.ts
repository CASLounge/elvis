import dotenv from 'dotenv'
import { app } from './api/v1/app'

dotenv.config()

const port = process.env.SERVER_PORT || 3000

app.listen(port, () => console.log(`CASLounge API is listening on port: ${port}`))
