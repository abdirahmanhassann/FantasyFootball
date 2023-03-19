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
const auth = require('./middleware/auth.ts')
const https = require('https');
const playersApiRequest = require('./middleware/playersApiRequest')
const cron=require('node-cron')
const postplayer=require('./middleware/postplayer')
const removePlayer = require('./middleware/removePlayer')
const updateRating = require('./middleware/updateRating')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const {fetchBootstrap,fetchEntryEvent,fetchFixtures}=require('fpl-api')
const getScores = require('./middleware/getScores')
const createleague = require('./middleware/createleague')
const loadleagues = require('./middleware/loadleagues')
const findleague = require('./middleware/findleague')
const joinleague = require('./middleware/joinleague')
const leaveleague = require('./middleware/leaveleague')
const news = require('./middleware/news')
const user={email:'popoeski',password:'po123'}


app.post('/signup',async(req,res)=>{
const {email}=req.body;
const {password}=req.body;

const hashedpassword=await bcrypt.hash(req.body.password,10 )

const result = await db.collection('users').insertOne({
    email: email,
    password: hashedpassword,
  budget:200,
  points:0
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
    res.status(200).send({jwtToken:signed,hashedpass:req.body.password,match:match})
}
else{ 
    res.status(403).send({passstatuse:'wrong password or email'})
}
})

app.get('/',async (req,res)=>{
    // const {email}=req.body;
    // const data=await fetchFixtures(20)
    // console.log(data)
    const player=[]
  fetch('https://fantasy.premierleague.com/api/bootstrap-static/')
  .then(res1=>res1.json())
  .then(data => {
    const footballers = data.elements.filter(element => element.element_type >= 2 && element.element_type <= 4);
    footballers.forEach((i)=>
    { 
      let players={
  totalPoints:i.total_points,
  averagePoints:i.points_per_game,
  firstname:i.first_name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
  surname:i.second_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      }
player.push(players)
    })
    res.send(player);
  })
})
  
app.get('/loadplayers',auth,async (req,res)=>{
    const collection = db.collection('players');
    const {email}=req.body
    try {
      const doc = await collection.findOne({});
      if (!doc) {
        return res.status(404).json({ message: 'No player data found' });
      }

      const playerArr = doc.players;
      res.status(200).json({ playerArr:playerArr,email:email,points:doc.points });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving player data' });
    }

})


app.get('/getplayer',auth,async(req,res)=>{
    const email=req.email;
    const returnTeam =  await db.collection('users').findOne({email});
    res.send({players:returnTeam.team,budget:returnTeam.budget,email:email,points:returnTeam.points })
    })
let db;
connectToDb((err)=>{

    if (err) return console.log(err)

    app.listen( process.env.PORT || 5002 ,()=>{
        console.log('app is listening...')
    })
    db=getDb()
  app.delete('/removePlayer',auth,removePlayer)

    app.post('/postplayer',auth,postplayer)   
    
    app.get('/updateRating',updateRating)

    app.get('/getScores',getScores)

    app.post('/createleague',auth,createleague)
app.get('/loadleagues',auth,loadleagues)
app.post('/findleague',auth,findleague)
app.post('/joinleague',auth,joinleague)
app.delete('/leaveleague',auth,leaveleague)
app.get('/news',news)
//     cron.schedule('37 1 * * *',()=>{
//     playersApiRequest()
// })
})