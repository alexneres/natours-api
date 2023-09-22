const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const Tour = require('../models/tour')

dotenv.config({ path: '.env' })

const DB_PASSWORD = process.env.MONGO_DB_PASSWORD
const DB = process.env.MONGO_DB.replace('<PASSWORD>', DB_PASSWORD)

const devData = path.join(__dirname, '../dev-data/data/tours-simple.json')
const tours = JSON.parse(fs.readFileSync(devData, 'utf-8'))

const importToDatabase = async () => {
  try {
    await Tour.create(tours)
    console.log('Data successfully added!')
  } catch (error) {
    console.error(error)
  } finally {
    process.exit()
  }
}

const deleteAllDatabase = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data successfully deleted!')
  } catch (error) {
    console.error(error)
  } finally {
    process.exit()
  }
}

mongoose.connect(DB).then(() => {
  console.log('Connected to Database!')
})

switch (process.argv[2]) {
  case '--import':
    importToDatabase()
    break
  case '--delete':
    deleteAllDatabase()
    break
  default:
    break
}
