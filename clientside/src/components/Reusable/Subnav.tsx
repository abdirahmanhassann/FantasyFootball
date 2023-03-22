import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import playerpic from '../../images/navbarpic.png'
import { jwt, refresh } from '../../redux/redux';
function Subnav(props) {
const navigate=useNavigate();
const dispatch=useDispatch()
function clicked(a){
navigate(`/${a}`)
}
function signout(){
  navigate('/')
dispatch(jwt(null))
dispatch(refresh(null))
}

  return (
    <div className='subnav'>
<div className='rowdiv2'>
<div className='columndiv'>
    <h1 className='headerdiv'>Fantasy Premier league</h1>
    <div className='rowdiv'>

<button className={props.page==='home' ? 'buttonstrue':'buttons'} onClick={()=>clicked('signedInHome')} >Home</button>

<button className={props.page==='squad' ? 'buttonstrue':'buttons'} onClick={()=>clicked('squadselection')}>Squad selection</button>
<button className={props.page==='leagues' ? 'buttonstrue':'buttons'} onClick={()=>clicked('leagues/viewleagues')} >Leagues</button>
<button className='buttons' onClick={signout}>Sign out</button>
    </div>
</div>
<img src={playerpic} className='navbarpic'/>
</div>
    </div>
  )
}

export default Subnav