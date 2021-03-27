/* Requiring Dependencies */
const express = require('express')
const morgan = require('morgan')


const postRoute = require('./routes/post')

const app = express()

app.use(morgan("dev"))

app.use('/', postRoute)



app.listen(8080, () => {
    console.log("Server started at http://localhost:8080")
})