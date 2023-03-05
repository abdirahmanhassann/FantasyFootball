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
const auth = require('./middleware/auth')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const user={email:'popoeski',password:'po123'}

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

app.post('/auth',auth,async (req,res)=>{
console.log(req.body.email)
const dbcheck = await db.collection('users').findOne({ email: req.body.email });
console.log(dbcheck.password)
})

app.post('/login',async(req,res)=>{
//const finduser=user.email===req.body.email

const dbcheck = await db.collection('users').findOne({ email: req.body.email });
console.log(dbcheck)
if(dbcheck==null) return res.status(500).send('Email does not exist')
const match = await bcrypt.compare(req.body.password, dbcheck.password);
if (match){
 const signed=  jwt.sign(req.body.email,process.env.ACCESS_TOKEN)
    res.send({jwtToken:signed,hashedpass:req.body.password,match:match})
}
else{ 
    res.send({passstatuse:'wrong password',reqpassword:req.body.password,password:dbcheck.password})
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

