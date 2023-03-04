require('dotenv').config()
const express=require('express')
const cors=require('cors')
const app=express()
const admin=require('firebase-admin')
const credentials=require('./football-fantasy-3c451-firebase-adminsdk-dh80g-1ef35d1d52.json')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const user=[
    {email:'popoeski@gmail.com',password:'popopopoeskiiii'}
]


app.post('/crypt',async(req,res,next)=>{
const {email}=req.body;
const {password}=req.body;

const hashedpassword=await bcrypt.hash(req.body.password,10 )

user.push({email:email,password:hashedpassword})
res.send(user)
next()
})

app.post('/login',async(req,res)=>{
const finduser=user.find(i=>i.email===req.body.email)
if(finduser==undefined) return res.status(500)

if (await bcrypt.compare(req.body.password,finduser.password)){
    res.send('success')
}
else{
    res.send({req:req.body.password,user:finduser.password})
}

})

app.post('/',(req,res)=>{
    const {email}=req.body;

    res.json({email:email})
})


app.listen( process.env.PORT || 5001 ,()=>{
    console.log('app is listening...')
})
