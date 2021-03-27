/* Requiring Dependencies */
const express = require('express')


const app = express()

app.get('/', (req, res) => {
    res.send("Hello world from NodeJS")
})


app.listen(8080, () => {
    console.log("Server started at http://localhost:8080")
})