//const { ObjectID, ObjectId } = require("bson")
const mongoose=require("mongoose")
const path = require("path")
const express = require("express")
const open = require('open')
const bcrypt=require("bcryptjs")
const app = express()
const User = require("./models/user")
const Company = require("./models/company")
const port = process.env.PORT || 3000

app.use(express.json())             

app.post('/users', (req, res) => {
    const a = new User(req.body);
    a.save().then(() => {
        res.status(201)
        res.send(a)
    }).catch((error) => {
        res.status(400)
        res.send(error)
    })
})

app.post('/login', (req, res) => {
    var k=0;
    User.find({}).then((users)=>{
        for(let i=0;i<users.length;i++){
            if(users[i].name===req.body.name){
                if(users[i].password===req.body.password){
                    res.send("correct")
                    open('localhost:3000/page')
                    k=1;
                    break
                }          
            }
    }
        if(k===0){
            res.send("Invalid password or username")
        }
})
})

app.get("/users",(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.get("/users/:id",(req,res)=>{
    const _id=req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }else{
        res.send(user)}
    }).catch((e)=>{
        res.status(500).send()
    })
    console.log(req.params)
})

app.get("/page",(req,res)=>{
    
 })

app.get("/comp",(req,res)=>{

})

app.get("/int",(req,res)=>{
    Company.find({}).then((comp)=>{
      //  let ele = (({ cname, cat,caddress }) => ({ cname,cat,caddress }))(comp);
        //comp.map((ele)=>({name:comp.cname, cat: comp.cat,address:comp.address}))
        res.send(comp)
    }).catch((e)=>{
        res.status(500).send()
    })    
})

app.post("/comp",(req,res)=>{
    const a = new Company(req.body);
    a.save().then(() => {
        res.status(201)
        res.send(a)
    }).catch((error) => {
        res.status(400)
        res.send("Enter Strong password")
    })
})


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true}).then(()=>{
 app.listen(port, () => {
    console.log("Server is up")
})  }).catch((e)=>{
    console.log(e)
})     
    



