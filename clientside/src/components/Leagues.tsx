import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Reusable/Footer.tsx'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'

function Leagues() {
    const navigate=useNavigate()
  return (
<>
<Navbar/>
<Subnav  page={'leagues'}/>
<div className='columndiv2'>
<h1>Leagues</h1>
<div className='subnav4'>
    <div className='rowdiv' style={{ gap: '15px'}}>
    <button className='buttons2' onClick={()=>navigate('/leagues/createleague') }>Create or join new league</button>
    <button className='buttons2'>View joined leagues</button>
    </div>
</div>
</div>
<Footer/>
</>
  )
}

export default Leagues