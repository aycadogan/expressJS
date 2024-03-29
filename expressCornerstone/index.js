const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const rootDirectory = require('./util/path')

const app = express() 

app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(path.join(_dirname,'public'))) //serve files statically
app.use(adminRoutes)
app.use(shopRoutes)

//catch all middleware
app.use((req,res,next)=> {
    // res.status(404)
    // res.send('<h1>page not found</h1>')
    // res.status(404).sendFile(path.join(rootDirectory, 'views', '404.html'))
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))