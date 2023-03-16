import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Reusable/Footer.tsx'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'

function Joinleague() {
  return (
    <div>
        <Navbar/>
        <Subnav/>
        <div className='columndiv2' style={{gap:'20px'}}>
        <h1>Join Invitational League</h1>
        <label htmlFor='input' className='lightlabel'> 
Enter League ID
        </label>
        <input type='text' maxLength={30} placeholder='' className='leagueinput' />
        <form>
        <button className='buttoncard' style={{paddingInline:'45px'}}>Join</button>
        </form>
        </div>
        <Footer/>

    </div>
  )
}

export default Joinleague;
