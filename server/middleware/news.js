
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {getDb}=require('../db')
function news(req,res,next){
const db=getDb()

    fetch('https://gnews.io/api/v4/search?q="premier league"&token=a0ef6727e3c457e427abe7f92e3c2077')
.then((res)=>res.json())
.then((res1)=>{
db.collection('news').insertOne(res1)

    res.status(200).send({res:res1})
})
}

module.exports= news