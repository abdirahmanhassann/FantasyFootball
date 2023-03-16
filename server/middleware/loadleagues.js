const {getDb}=require('../db')

async function loadleagues(req,res,next){
    const db=getDb()
const {email}=req
console.log(email)
const details = await db.collection('leagues').find({ owner: email }).toArray();

await res.status(200).send(details)

}


module.exports=loadleagues