const {MongoClient}=require('mongodb')
require('dotenv').config()

let dbconnection;
let uri ='mongodb+srv://abdirahman:abdirahman@cluster0.luseobv.mongodb.net/?retryWrites=true&w=majority'

module.exports ={
connectToDb:(cb)=>{
    MongoClient.connect(process.env.MONGO_URI)
    .then((client)=>{
        dbconnection= client.db()
        return cb()
    })
    .catch((err)=>{
        console.log(err)
        return cb(err)
    })
},
getDb:()=>dbconnection
}
