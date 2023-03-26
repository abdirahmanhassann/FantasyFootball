import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from './Reusable/Footer.tsx'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'

function Create() {
const [name,setname]=useState<string>('')
const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt)
const navigate=useNavigate()
    function submit(e){
  e.preventDefault();
  if(name.length<5){
      alert('League name has to be longer than 5 characters');
    }
    else{        
        fetch( 'https://fantasyfootballbackend2.onrender.com/createleague',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwttoken}`,
              },
              body: JSON.stringify({league:name}),
         })
        .then((res)=>res.json())
        .then((res)=> console.log(res),navigate('/leagues'))
        .catch((err)=>alert('There is an error'))
    }
    }
  return (

    <div>
        <Navbar/>
        <Subnav/>
        <div className='settingsdiv'
           style={{
           width: '800px',marginLeft: '61px',marginTop:'10px',
           backgroundPosition: '293px center, left top, 0px center',  margin: 'auto',    padding: '10px'}}>

        <div className='columndiv2' style={{gap:'20px'}}>
        <h1>Create Invitational League</h1>
        <input type='text' maxLength={30} minLength={5} placeholder='' className='leagueinput' value={name} onChange={(e)=>setname(e.target.value)}/>
        <form onSubmit={submit}>
        <p className='lightp'> 
        Please think carefully before entering your league name. Leagues with names that are deemed inappropriate or offensive may result in your account being deleted. Please refer to the Terms & Conditions of entry for more information.
        </p>
        <button className='buttoncardpurple' style={{paddingInline:'35px'}}>Create league</button>
        </form>
        </div>
        </div>
        <Footer/>

    </div>
  )
}

export default Create