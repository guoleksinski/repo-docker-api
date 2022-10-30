// initial config
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

// read JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//api routes
 const todoRoutes = require('./routes/todoRoutes')
 app.use('/todo', todoRoutes)

//initial route / endpoint
app.get('/', (req, res) => {
    res.json({message: 'Hello World!'})
})


//port listener
const DB_USER = "dasdas"
const DB_PASS = "dasdas"
MONGO_CONNECTION_STRING="mongodb://mongo-db:27017"
mongoose.connect(MONGO_CONNECTION_STRING)
.then(() => {
    console.log("conectado ao mongoDb")
    app.listen(port)
})
.catch((erro) => console.log(erro))
