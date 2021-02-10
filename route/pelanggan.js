const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// GET: /pelanggan --> end point untuk mengakses data pelanggan
app.get("/", (req,res) => {
    let sql = "select * from pelanggan"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                pelanggan: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })    
})

// POST: /pelanggan --> end point untuk pencarian data pelanggan
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from pelanggan where id_pelanggan like '%"+find+"%' or nama_pelanggan like '%"+find+"%' or email_pelanggan like '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                pelanggan: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /pelanggan/save --> end point untuk insert data pelanggan
app.post("/save", (req,res) => {
    let data = {
        id_pelanggan: req.body.id_pelanggan,
        nama_pelanggan: req.body.nama_pelanggan,
        email_pelanggan: req.body.email_pelanggan,
        telp_pelanggan: req.body.telp_pelanggan,
        alamat_pelanggan: req.body.alamat_pelanggan,
        username: req.body.username,
        password: req.body.password
    }
    let message = ""

    let sql = "insert into pelanggan set ?"
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

// POST: /pelanggan/update --> end point untuk update data pelanggan
app.post("/update", (req,res) => {
    let data = [{
        id_pelanggan: req.body.id_pelanggan,
        nama_pelanggan: req.body.nama_pelanggan,
        email_pelanggan: req.body.email_pelanggan,
        telp_pelanggan: req.body.telp_pelanggan,
        alamat_pelanggan: req.body.alamat_pelanggan,
        username: req.body.username,
        password: req.body.password
    }, req.body.id_pelanggan]
    let message = ""

    let sql = "update pelanggan set ? where id_pelanggan = ?"
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

// DELETE: /pelanggan/:id_pelanggan --> end point untuk hapus data pelanggan
app.delete("/:id_pelanggan", (req,res) => {
    let data = {
        id_pelanggan : req.params.id_pelanggan
    }
    let message = ""
    let sql = "delete from pelanggan where ?"
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
