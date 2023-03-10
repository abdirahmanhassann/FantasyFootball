const {getDb}=require('../db')

async function postplayer(req,res,next){
const i=req.body
const email=req.email;
console.log(email)
const db=getDb();
    
let check=  await db.collection('users').findOne({email})
const playerid=i.team.player.id

if(playerid===check.team.gk?.player.id || playerid===check.team.rb?.player.id || playerid===check.team.rcb?.player.id
  || playerid===check.team.lcb?.player.id || playerid===check.team.lb?.player.id || playerid===check.team.rcm?.player.id
  || playerid===check.team.cm?.player.id || playerid===check.team.lcm?.player.id || playerid===check.team.rw?.player.id
  || playerid===check.team.st?.player.id || playerid===check.team.lw?.player.id
  )

  {
  res.send( 'already exists')
  next()
}
else if(i.team.position===check.team.gk?.position ||i.team.position===check.team.rb?.position ||i.team?.position===check.team.rcb?.position ||
  i.team?.position===check.team.lcb?.position ||i.team?.position===check.team.lb?.position ||i.team?.position===check.team.rcm?.position ||
  i.team?.position===check.team.cm?.position ||i.team?.position===check.team.lcm?.position ||i.team?.position===check.team.rw?.position ||
  i.team.position===check.team.st?.position ||i.team.position===check.team.lw?.position ){

   await db.collection('users').updateOne({email}, {
      $set: {
        [`team.${i.team.position}`]: i.team
      }
    }
    );

    const returnTeam=  await db.collection('users').findOne({email})

    res.send(returnTeam.team)

  }



else{
   console.log(i)
await db.collection('users').findOneAndUpdate(
    { email },
    {
      $set: {
        [`team.${i.team.position}`]: i.team
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