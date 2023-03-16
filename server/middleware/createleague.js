const {getDb}=require('../db')
const {ObjectId}=require('mongodb')
async function createleague(req,res,next){
    const db=getDb()
const {league}=req.body;
const {email}=req
const nowDate=new Date()
const id2=new ObjectId('641365b83d0fdc515900a5c8')
console.log(league,email) 

await db.collection('leagues').insertOne(
     {league: league,owner:email,createdAt:nowDate,players:[email]}
   )

   const id = await db.collection('leagues').findOne({_id:id2})
   console.log(id)
}


module.exports=createleague