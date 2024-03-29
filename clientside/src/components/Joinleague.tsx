import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { league } from '../redux/redux'
import Footer from './Reusable/Footer.tsx'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'

function Joinleague() {
const [change,setchange]=useState<string>('')
const [error,seterr]=useState<string>('');
const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt)
const navigate=useNavigate()
const dispatch=useDispatch()
   async function clicked(e){
e.preventDefault();
fetch( 'https://fantasyfootballbackend2.onrender.com/joinleague',{
    method:'POST',
    headers:{
      'content-Type':'application/json' ,
      Authorization: `Bearer ${jwttoken}` 
    },
    body: JSON.stringify({id:change})
})
.then((res)=>res.json())
.then((res)=>
{
    console.log(res)
    if (res.status===200){
        dispatch(league(res.id))
        navigate(`/leagues/viewleagues/${res.id}`)
    }
    else{
        seterr('Code does not exist')
    }
})
.catch((err)=>{
    console.log(err)
    if (err==400){
seterr('Code does not exist')
    }
    else if(err==500){
        seterr('Server error')
    }
    else{
        seterr('error')
    }
})
    }

  return (
    <div>
        <Navbar/>
        <Subnav/>
        <div className='settingsdiv'
           style={{
           marginLeft: '61px',marginTop:'10px',
          boxShadow:'none',maxWidth:'1200px' ,  margin: 'auto',    padding: '10px'}}>

        <div className='columndiv2' style={{gap:'20px',width:'100%'}}>
        <h1>Join Invitational League</h1>
        <label htmlFor='input' className='lightlabel'> 
Enter League ID
        </label>
        <form onSubmit={clicked}>
        <input type='text' maxLength={30} placeholder='' className='leagueinput' onChange={e=>{
            setchange(e.target.value)
            seterr('')
            console.log(change)
        }
            } />
        <button className='buttoncard' style={{paddingInline:'45px'}} >Join league</button>
        </form>
        <p color='red'>{error!=='' && error}</p>
        </div>
        </div>
        <Footer/>

    </div>
  )
}

export default Joinleague;
