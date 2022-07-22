import dotenv from 'dotenv'
import { app } from './api/v1/app'

dotenv.config()

const port = process.env.PORT || 3001

// @ts-ignore
app.listen(port, '0.0.0.0', () => {
  console.log('Server is running.')
})
