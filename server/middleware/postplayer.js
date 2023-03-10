const {getDb}=require('../db')

async function postplayer(req,res,next){
const i=req.body
const email=req.email;
console.log(email)
const db=getDb();


    
const check=  await db.collection('users').findOne({email})
const playerid=i.team.player.id
console.log(i.team.player.id)
console.log(check.team.gk.player.id)

if(playerid===check.team.gk?.player.id || playerid===check.team.rb?.player.id || playerid===check.team.rcb?.player.id
  || playerid===check.team.lcb?.player.id || playerid===check.team.lb?.player.id || playerid===check.team.rcm?.player.id
  || playerid===check.team.cm?.player.id || playerid===check.team.lcm?.player.id || playerid===check.team.rw?.player.id
  || playerid===check.team.st?.player.id || playerid===check.team.lw?.player.id
  )
  {
  res.send( 'already exists')
  next()
}

else{
await db.collection('users').findOneAndUpdate(
    { email },
    {
      $set: {
        [`team.${req.body.team.position}`]: req.body.team
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
//db.collection('users').document
}

module.exports=postplayer;