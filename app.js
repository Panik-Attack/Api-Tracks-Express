require('dotenv').config()
const express =  require('express')
const cors =  require('cors')
const dbConnect = require('./config/mongo')
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static('storage'))

const port = process.env.PORT

// Localhost:port/api 
app.use('/api',require('./routes/index'))


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

dbConnect()