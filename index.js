/* Requiring Dependencies */
const express = require('express')
const morgan = require('morgan')
const mongooose = require('mongoose')
const ExpressValidator = require('express-validator')

require('dotenv').config()


const postRoute = require('./routes/post')


const app = express()

// Middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(ExpressValidator())
app.use('/', postRoute);



//Connecting Database MongoDB
mongooose
    .connect(
      process.env.DB_KEY_URL
        ,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log('MongoDB Connected')
      
    })
    .catch(err => console.log(err))

const port = process.env.PORT || 8080

app.listen(port , () => {
    console.log("Server started at http://localhost:8080")
})

