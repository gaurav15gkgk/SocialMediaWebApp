/* Requiring Dependencies */
const express = require('express')
const morgan = require('morgan')
const mongooose = require('mongoose')
const ExpressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fs = require('fs')

require('dotenv').config()

//routes added
const postRoute = require('./routes/post')
const authRoutes = require('./routes/auth')
const UserRoutes = require('./routes/user')


const app = express()

// Middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(ExpressValidator())
app.use(cookieParser())
app.use(cors())

//routes use
app.use('/', postRoute);
app.use('/', authRoutes); 
app.use('/', UserRoutes);

app.use( (err, req, res, next ) => {
    if(err.name === "UnauthorizedError"){
        res.status(401).json({ error:"Unauthorized!"})
    }
})

//apiDocs
app.get('/', (req, res) => {
    fs.readFile("docs/apiDocs.json", (err, data) => {
        if(err){
            res.status(400).json({
                error: err
            })
        }

        const docs = JSON.parse(data)
        res.json(docs)
    })
})



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

