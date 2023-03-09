const {getDb}=require('../db')

async function postplayer(req,res,next){
const i=req.body
const email=req.email;
console.log(email)
const db=getDb();
await db.collection('users').findOneAndUpdate(
    { email },
    {
      $addToSet: { "team":  {"position": req.body.team.position, "member": req.body.team} }
     },
    { returnOriginal: false },
    function(err, result) {
      if (err) throw err;
      console.log(`${result.value.email} updated`);
      client.close();
    }
    );
    
  const returnTeam=  await db.collection('users').findOne({email})
res.send(returnTeam)
//db.collection('users').document
}

module.exports=postplayer;