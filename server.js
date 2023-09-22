const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: '.env' })

const app = require('./app')

const PORT = process.env.PORT || 3000

const DB_PASSWORD = process.env.MONGO_DB_PASSWORD
const DB = process.env.MONGO_DB.replace('<PASSWORD>', DB_PASSWORD)

mongoose.connect(DB).then(() => {
  console.log('Connected to Database!')
})

app.listen(PORT, () => {
  console.log('App running on port ', PORT)
})
