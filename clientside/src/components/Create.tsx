import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Reusable/Footer.tsx'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'

function Create() {
  return (
    <div>
        <Navbar/>
        <Subnav/>
        <div className='columndiv2' style={{gap:'20px'}}>
        <h1>Create Invitational League</h1>
        <input type='text' maxLength={30} placeholder='' className='leagueinput' />
        <form>
        <p className='lightp'> 
        Please think carefully before entering your league name. Leagues with names that are deemed inappropriate or offensive may result in your account being deleted. Please refer to the Terms & Conditions of entry for more information.
        </p>
        <button className='buttoncard' style={{paddingInline:'35px'}}>Create</button>
        </form>
        </div>
        <Footer/>

    </div>
  )
}

export default Create