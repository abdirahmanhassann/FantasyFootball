import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Reusable/Footer.tsx'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'

function Createleague() {
    const navigate=useNavigate()
  return (
<>
<Navbar/>
<Subnav page={'leagues'}/>
<div className='columndiv2' style={{gap:'20px'}}>
<h1>Create or Join Leagues</h1>
    <div className='columndiv2' style={{marginBottom:0}}> 
<h2>Join an Existing League</h2>
<p>Join invitational or public leagues to compete against friends and other game players</p>
<button className='buttoncard'onClick={()=>{navigate('/leagues/createleague/join')}}>Join a league</button>
    </div>
<div className='columndiv2' style={{marginBottom:0}}>
<h2>Create a League </h2>
<p>Create an invitational league to compete against friends.</p>
<button className='buttoncard' onClick={()=>{navigate('/leagues/createleague/create')}}>Create a league</button>
</div>
</div>
<Footer/>
</>

    )
}

export default Createleague