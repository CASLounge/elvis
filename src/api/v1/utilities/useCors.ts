export const useCors = () => {
  // ? 3000 <- this server
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001'
  ]

  const options = {
    origin: (origin: any, callback: any) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    optionsSuccessStatus: 200,
    credentials: true
  }

  return {
    options
  }
}
