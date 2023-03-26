import React, { useRef, useState } from 'react'
import Navbar from './Reusable/Navbar.tsx'
import logo from '../images/pllogowhite.png'
import { useDispatch, useSelector } from 'react-redux'
import { jwt, refresh } from '../redux/redux'
import { useNavigate } from 'react-router-dom'
import Subnav3 from './Reusable/Subnav3.tsx'
import Footer from './Reusable/Footer.tsx'
import Cards from './Reusable/cards.tsx'
import News from './Reusable/News.tsx'
import SubnavSignedOut from './Reusable/SubnavSignedOut.tsx'
function Homepage() { 
  const [changed,setchanged]=useState <p>({email:'',password:''})
  const [login,setlogin]=useState <p>({email:'',password:''})
  const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt);
const loginemail=useRef<HTMLInputElement>(null)
const loginpassword=useRef<HTMLInputElement>(null)
const signupemail=useRef<HTMLInputElement>(null)
const signuppassword=useRef<HTMLInputElement>(null)
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
    fetch( 'https://fantasyfootballbackend2.onrender.com/signup' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:signupemail.current?.value, password:signuppassword.current?.value}),
    })
      .then(response => response.json())
      .then(changed => {
        console.log(changed);
        if(changed.error) return alert(changed.error)
        dispatch(jwt(changed.jwtToken))
        navigate('/squadselection')
      })
      .catch(err => {
        console.error('Error:', err);
        console.log('there is an error')
        alert(err?.error)
      });
      
    
  }
  
  function submittedlogin(e){
  
    e.preventDefault()
    fetch( 'https://fantasyfootballbackend2.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:loginemail.current?.value, password:loginpassword.current?.value}),
    })
      .then(response => response.json())
      .then(changed => {
        console.log(changed);
        if(changed.passstatuse) return alert(changed.passstatuse)
        if(changed.jwtToken)
{
  dispatch(jwt(changed.jwtToken))
  dispatch(refresh(changed.refreshToken))
  navigate('/squadselection')
}      })
      .catch(error => {
        console.error('Error:', error);
      }); 
  }
  return (
    <>
            <div>
      <Navbar/>
      <SubnavSignedOut/>
      <Cards/>
        <div className='centerdiv'>
         <form onSubmit={submittedlogin} className='homeform'>
  <h3>Login</h3>
<input className='inputhome' type='email' placeholder='Email' required={true}  name='email' ref={loginemail}/>
<input className='inputhome' type='password' placeholder='Password' ref={loginpassword}
 required={true}  name='password' />
<button className='buttoncardpurple'>Login to account</button>
</form>
<div className='homediv'>
  <div className='subhomediv'></div>
<p>or</p>
<div className='subhomediv'></div>
</div>
<form onSubmit={submitted} className='homeform' style={{ marginLeft: '-25px'}}>
  <h3>Sign up</h3>
<input className='inputhome' type='email' placeholder='Email' ref={signupemail}
 required={true}  name='email' />
<input className='inputhome' type='password' placeholder='Password'  ref={signuppassword}
required={true}  name='password'/>
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