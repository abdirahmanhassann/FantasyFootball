import React, { useState } from 'react'
import Navbar from './Reusable/Navbar.tsx'
import logo from '../images/pllogowhite.png'

function Homepage() { 
  const [changed,setchanged]=useState <p>({email:'',password:''})
const url='http://localhost:5002/signup'
  interface p{
    email:string;
    password:string;
  }

  function changedfunction(e){
    setchanged(i=>{
    return {
      ...i,
      [e.target.name]:e.target.value
    }
  })
  
  }

  function submitted(e){
    e.preventDefault()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changed),
    })
      .then(response => response.json())
      .then(changed => {
        console.log(changed);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      
    
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

<form onSubmit={submitted}>
<input type='email' placeholder='Email' required={true} value={changed.email} name='email' onChange={e=>changedfunction(e)}/>
<input type='password' placeholder='Password' required={true} value={changed.password} name='password' onChange={e=>changedfunction(e)}/>
<button>Enter</button>
</form>
          <div className="google-btn">
  <div className="google-icon-wrapper">
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