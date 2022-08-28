require('dotenv').config

//Initializing necessary dependencies

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const res = require('express/lib/response')

//Will probably insert router here later

const app = express()
const port = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send('Success!')
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })