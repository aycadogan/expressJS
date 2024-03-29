const router = require('express').Router()
const path = require('path')
const fs = require('fs')

const data = []

router.get("/", (req,res,next) => {
    res.sendFile(path.join(__dirname,'../views','index.html'))
})

router.get("/create", (req,res,next) => {
    res.sendFile(path.join(__dirname,'../views','create.html'))
})

router.post("/wish",(req,res,next) => {

    let wishEntry = {
        name: req.body.name,
        content: req.body.body,
        published: new Date().toLocaleDateString("en-US", {
            weekday:"long", 
            year:"numeric",
            month:"long",
            day:"numeric"
        })
    }

    data.push(wishEntry)
    fs.writeFile('wishes.txt',JSON.stringify(data), ()=>{
        res.status(302).redirect('/')
    })

})

router.get('/list', (req,res,next) => {
    fs.readFile('wishes.txt', 'utf8',(err,data) => {
        let wishList = []

        if(!err){
            try{
                wishList = JSON.parse(data)
            }catch(e){
                fs.writeFileSync('wishes.txt',[])
                wishList = []
            }
        }
        data = wishList
        res.render('list',{ title:"Wish List", wishList})
    })
})


module.exports = router