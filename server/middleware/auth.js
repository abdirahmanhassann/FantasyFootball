require('dotenv').config()
const jwt=require('jsonwebtoken')

 function auth(req,res,next){
const autherization=req.headers['authorization'];
console.log(autherization)
const token=autherization && autherization.split(' ')[1];

 jwt.verify(token,process.env.ACCESS_TOKEN,(err,email)=>{
    if(err){
    console.log(err)
        res.status(403).send('acces denied')
    }
    else{
        res.status(200).send({accessStatus:'Access granted',token:email})
        next()
    }

})

}


module.exports=auth