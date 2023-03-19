import React, { useState } from 'react'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'
import logo from '../images/pllogowhite.png'
import { useDispatch, useSelector } from 'react-redux'
import { jwt } from '../redux/redux'
import { useNavigate } from 'react-router-dom'
import Subnav3 from './Reusable/Subnav3.tsx'
import Footer from './Reusable/Footer.tsx'
import Cards from './Reusable/cards.tsx'
import News from './Reusable/News.tsx'
function Homepage() { 
  const [changed,setchanged]=useState <p>({email:'',password:''})
  const [login,setlogin]=useState <p>({email:'',password:''})
  const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt);

  const [po,setpo]=useState(0)
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
      <Subnav/>
      <Cards/>
        <div className='centerdiv'>
         <form onSubmit={submittedlogin} className='homeform'>
  <h3>Login</h3>
<input className='inputhome' type='email' placeholder='Email' required={true} value={login.email} name='email' onChange={e=>changedlogin(e)}/>
<input className='inputhome' type='password' placeholder='Password' required={true} value={login.password} name='password' onChange={e=>changedlogin(e)}/>
<button className='buttoncardpurple'>Login to account</button>
</form>
<div className='homediv'>
  <div className='subhomediv'></div>
<p>or</p>
<div className='subhomediv'></div>
</div>
<form onSubmit={submitted} className='homeform' style={{ marginLeft: '-25px'}}>
  <h3>Sign up</h3>
<input className='inputhome' type='email' placeholder='Email' required={true} value={changed.email} name='email' onChange={e=>changedfunction(e)}/>
<input className='inputhome' type='password' placeholder='Password' required={true} value={changed.password} name='password' onChange={e=>changedfunction(e)}/>
<button className='buttoncard'>Create account</button>
</form>
      
          <News/>
          </div>
<Subnav3/>
<Footer/>
          {/* <div className="google-btn">
  <div className="google-icon-wrapper">
    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
  </div>

    <p className="btn-text"><b>Sign in with google</b></p>
</div> */}
    </div>
    </>
  )
}

export default Homepage