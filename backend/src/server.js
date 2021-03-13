const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION,{
        useNewUrlParser: true,
        useUnifiedTopology: true
       
    })
    console.log('Connected to the Database!')
} catch (error) {
    console.log(error)
}

app.use("/files", express.static(path.resolve(__dirname,"..", "files")))
app.use(routes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
})