const {getDb}=require('../db')
const {ObjectId}=require('mongodb')
async function createleague(req,res,next){
    const db=getDb()
const {league}=req.body;
const {email}=req
const nowDate=new Date()
const id2=new ObjectId('641365b83d0fdc515900a5c8')
console.log(league,email) 
const user=await db.collection('users').findOne({email:email})
await db.collection('leagues').insertOne(
     {league: league,owner:email,createdAt:nowDate,players:[user]}
   )

}


module.exports=createleague