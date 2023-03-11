const {getDb}=require('../db')

async function removePlayer(req,res,next)
{
const {player}=req.body
const {email}=req
console.log(player,email)
const db=getDb();
await db.collection ('users').findOneAndUpdate({email},{
    $set:{
        [`team.${player}`]:null
    }
},
{ returnOriginal: false },
function(err, result) {
  if (err) throw err;
  console.log(`${result.value.email} updated`);
  client.close();
}
);

const returnTeam=  await db.collection('users').findOne({email})
res.send(returnTeam.team)

}

module.exports=removePlayer;