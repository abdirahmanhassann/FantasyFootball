const express=require('express')
const cors=require('cors')
const app=express()
app.use(cors);
app.use(express.json())


app.get('/',(req,res)=>{
    console.log('popoeski')
    res.send({email:'popoeski',password:'po123'})
})
app.post('/',(req,res)=>{
    const {email}=req.body;
    const {password}=req.body;
    console.log({email:email,password:password})
    res.send({email:email,password:password})
})

app.listen( process.env.PORT || 5001 ,()=>{
    console.log('app is listening...')
})
