const express = require('express')
const { accessControl,defaultMiddleware} = require('./middleware')
const users = [
    {
        id: 1,
        name: 'ayca',
        place:'Vancouver'
    },
    {
        id: 2,
        name: 'ayca',
        place:'Barcelona'
    }
]
const app = express()
const PORT = 5000

app.use(express.json())
// app.use(accessControl) //uygulama kapsami
//Get Request
//localhost:5000/users
app.get("/users", (req,res,next) => {
    res.json({
        success:true,
        data: users
    })
})
app.get("/ourusers",accessControl,defaultMiddleware, (req,res,next) => {
    res.json(users)
})
app.get("/products", (req,res,next) => {
    res.json('products')
})

app.post("/users", (req,res,next) => {
    // console.log(req.body);
    const user = req.body
    users.push(user)
    res.json({
        success:true,
        data:users
    })
})
// users/1
app.put("/users/:id", (req,res,next) => {
    
    const id = parseInt(req.params.id)
    for(let i =0; i<users.length; i++){
        if(users[i].id === id){
            users[i] = {
                ...users[i],
                ...req.body
            }
        }
    }
    res.json({
        success:true,
        data:users
    })
})
app.delete("/users/:id", (req,res,next) => {
    const id = parseInt(req.params.id)
    for(let i =0; i<users.length; i++){
        if(users[i].id === id){
            users.splice(i,1)
        }
    }
    res.json({
        success:true,
        data:users
    })
})

app.listen(PORT, () => {
    console.log('server started ' + PORT);
})