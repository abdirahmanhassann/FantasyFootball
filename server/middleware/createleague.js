const {getDb}=require('../db')
const {ObjectId}=require('mongodb')
async function createleague(req,res,next){
    const db=getDb()
const {league}=req.body;
const {email}=req
const nowDate=new Date()
console.log(league,email) 
const leagues =await db.collection('leagues').insertOne(
    {league: league,owner:email,createdAt:nowDate,players:[email]}
    )
    const leaguesid = new ObjectId(leagues.insertedId);
    
    const user=await db.collection('users').findOneAndUpdate({email:email},
        
            {
                $addToSet: {leagues:leaguesid}
            } 
        
         )


         res.status(200).send(user)
}

module.exports=createleague