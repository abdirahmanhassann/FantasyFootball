import React from 'react'
import Footer from './Reusable/Footer.tsx'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'

function Createleague() {
  return (
<>
<Navbar/>
<Subnav page={'leagues'}/>
<div className='columndiv2' style={{gap:'20px'}}>
<h1>Create or Join Leagues</h1>
    <div className='columndiv2' style={{marginBottom:0}}> 
<h2>Join an Existing League</h2>
<p className='lightp'>Join invitational or public leagues to compete against friends and other game players</p>
<button className='buttoncard'>Join a league</button>
    </div>
<div className='columndiv2' style={{marginBottom:0}}>
<h2>Create a League </h2>
<p className='lightp'>Create an invitational league to compete against friends.</p>
<button className='buttoncard'>Create a league</button>
</div>
</div>
<Footer/>
</>

    )
}

export default Createleague