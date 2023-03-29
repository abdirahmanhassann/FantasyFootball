const {getDb}=require('../db')


async function displaynextfixture (req,res,next){

    const db=getDb();
    
    next()
}


module.exports=displaynextfixture