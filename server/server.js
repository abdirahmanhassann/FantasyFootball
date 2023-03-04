require('dotenv').config()
const express=require('express')
const cors=require('cors')
const app=express()
const admin=require('firebase-admin')
const credentials=require('./football-fantasy-3c451-firebase-adminsdk-dh80g-1ef35d1d52.json')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const {connectToDb,getDb}=require('./db')
const {MongoClient}=require('mongodb')
const {ObjectId}=require('mongodb')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const uri ='mongodb://localhost:27017'
const user=[
    {email:'popoeski@gmail.com',password:'popopopoeskiiii'}
]


app.post('/signup',async(req,res)=>{
const {email}=req.body;
const {password}=req.body;

const hashedpassword=await bcrypt.hash(req.body.password,10 )

const result = await db.collection('users').insertOne({
    email: email,
    password: hashedpassword,
  });
console.log(result)
  // Send a response to the client
  res.status(200).send(result);

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
 
let db;
connectToDb((err)=>{

    if (err) return console.log(err)

    app.listen( process.env.PORT || 5002 ,()=>{
        console.log('app is listening...')
    })
    db=getDb()

})    

