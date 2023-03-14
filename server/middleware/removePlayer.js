const {getDb}=require('../db')

async function removePlayer(req,res,next)
{
const {player}=req.body
const {cost}=req.body;
const {email}=req
console.log(player,email)
const db=getDb();

// const returnTeam2=  await db.collection('users').find(`team.${player}`)

// await db.collection('users').updateOne({email},{
//     $inc: { budget: +player.nowCost }   
// },
// { returnOriginal: false },
// function(err, result) {
//   if (err) throw err;
//   console.log(`${result.value.email} updated`);
//   client.close();
// })
console.log(cost)
await db.collection ('users').findOneAndUpdate({email},{
    $inc: { budget: +cost } ,  
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