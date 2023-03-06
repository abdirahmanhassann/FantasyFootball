import React, { useState } from 'react'
import Navbar from './Reusable/Navbar.tsx'
import logo from '../images/pllogowhite.png'
import { useDispatch, useSelector } from 'react-redux'
import { jwt } from '../redux/redux'
import { useNavigate } from 'react-router-dom'

function Homepage() { 
  const [changed,setchanged]=useState <p>({email:'',password:''})
  const [login,setlogin]=useState <p>({email:'',password:''})
  const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt)
  const dispatch=useDispatch()
  const navigate=useNavigate()
const url='http://localhost:5002/signup'
const urllogin='http://localhost:5002/login'
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

  function changedlogin(e){
    setlogin(i=>{
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
  
  function submittedlogin(e){
    e.preventDefault()
    fetch(urllogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    })
      .then(response => response.json())
      .then(changed => {
        console.log(changed);
        if(changed.jwtToken)
{
  dispatch(jwt(changed.jwtToken))
  navigate('/chooseleague')
}      })
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
  <h1>Sign up</h1>
<input type='email' placeholder='Email' required={true} value={changed.email} name='email' onChange={e=>changedfunction(e)}/>
<input type='password' placeholder='Password' required={true} value={changed.password} name='password' onChange={e=>changedfunction(e)}/>
<button>Enter</button>
</form>
<form onSubmit={submittedlogin}>
  <h1>Login</h1>
<input type='email' placeholder='Email' required={true} value={login.email} name='email' onChange={e=>changedlogin(e)}/>
<input type='password' placeholder='Password' required={true} value={login.password} name='password' onChange={e=>changedlogin(e)}/>
<button>Enter</button>
</form>
          {/* <div className="google-btn">
  <div className="google-icon-wrapper">
    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
  </div>

    <p className="btn-text"><b>Sign in with google</b></p>
</div> */}
        </div>
    </div>
    </>
  )
}

export default Homepage