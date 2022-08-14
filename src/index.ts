import dotenv from 'dotenv'
import { app } from './api/v1/app'

dotenv.config()

// The difference between PORT and SERVER_PORT is
// SERVER_PORT = Development and Staging development environment
// PORT = is the default heroku env var which is good for preview or production
// Bruh...
const port: number = Number(process.env.PORT!) || Number(process.env.SERVER_PORT!)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running @ port ${port}`)
})
