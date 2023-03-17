
const {getDb}=require('../db')
const {ObjectId}=require('mongodb')
async function joinleague(req,res,next){
    const db=getDb()
const {email}=req
const{id}=req.body;
const idobject=new ObjectId(id)
const user=await db.collection('leagues').findOne({_id:idobject})

if(user){

    const person=await db.collection('users').findOne({email:email});
    console.log(person)
  const add=  await db.collection('leagues').findOneAndUpdate({_id:idobject},
        {$addToSet: {players:person}}
     )
    console.log(add)
  await  res.status(200).send({status:200,id:id})
}
else{

    await  res.status(400).send({status:400})
}
}


module.exports=joinleague