const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// GET: /pesawat --> end point untuk mengakses data pesawat
app.get("/", (req,res) => {
    let sql = "select * from pesawat"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                pesawat: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })    
})

// POST: /pesawat --> end point untuk pencarian data pesawat
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from pesawat where id_pesawat like '%"+find+"%' or maskapai like '%"+find+"%' or rute like '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                pesawat: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /pesawat/save --> end point untuk insert data pesawat
app.post("/save", (req,res) => {
    let data = {
        id_pesawat: req.body.id_pesawat,
        maskapai: req.body.maskapai,
        id_kelas: req.body.id_kelas,
        rute: req.body.rute,
        harga: req.body.harga
    }
    let message = ""

    let sql = "insert into pesawat set ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row inserted"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// POST: /pesawat/update --> end point untuk update data pesawat
app.post("/update", (req,res) => {
    let data = [{
        id_pesawat: req.body.id_pesawat,
        maskapai: req.body.maskapai,
        kelas: req.body.id_kelas,
        rute: req.body.rute,
        harga: req.body.harga
    }, req.body.id_pesawat]
    let message = ""

    let sql = "update pesawat set ? where id_pesawat = ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row updated"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// DELETE: /pesawat/:id_pesawat --> end point untuk hapus data pesawat
app.delete("/:id_pesawat", (req,res) => {
    let data = {
        id_pesawat : req.params.id_pesawat
    }
    let message = ""
    let sql = "delete from pesawat where ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row deleted"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

module.exports = app
