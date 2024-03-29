const express = require('express')
const parser = require('body-parser')
const routes = require('./routes/routes')

//setups
const app = express()
app.set('view engine', 'ejs')

//middleware
app.use(parser.urlencoded({extended:false}))
app.use(express.static.apply('./public'))
app.use(routes)

//server starts
app.listen(8000)