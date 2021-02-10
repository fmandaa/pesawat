const express = require('express')
const app = express()
const db = require('./config')

//endpoint pesawat
const pesawat = require('./route/pesawat')
app.use("/pesawat", pesawat)

app.listen(2000, () => {
    console.log("server run on port 2000")
})

//endpoint pelanggan
const pelanggan = require('./route/pelanggan')
app.use("/pelanggan", pelanggan)

app.listen(2001, () => {
    console.log("server run on port 2001")
})