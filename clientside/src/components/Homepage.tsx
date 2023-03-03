import React from 'react'
import Navbar from './Reusable/Navbar.tsx'
import logo from '../images/pllogowhite.png'

function Homepage() { 
  function clicked(){
    
  }
  return (
    <>
            <div>
      <Navbar/>
        <div className='centerdiv'>
          <div className='headerdiv'>
<img src={logo} className='logo' />
          <h1>Fantasy Premier league</h1>
          </div>
          <p>If you have an existing Premier League account, please use the link below to login and connect this social account to it so that you can log in to the same profile using your original account or using your social account.</p>
          <div className="google-btn">
  <div className="google-icon-wrapper" onClick={clicked}>
    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
  </div>
  <p className="btn-text"><b>Sign in with google</b></p>
</div>
        </div>
    </div>
    </>
  )
}

export default Homepage