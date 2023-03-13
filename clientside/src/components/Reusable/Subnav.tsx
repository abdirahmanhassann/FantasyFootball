import React from 'react'
import playerpic from '../../images/navbarpic.png'
function Subnav(props) {
  return (
    <div className='subnav'>
<div className='rowdiv2'>
<div className='columndiv'>
    <h1 className='headerdiv'>Fantasy Premier league</h1>
    <div className='rowdiv'>

<button className={props.page==='home' ? 'buttonstrue':'buttons'}>Home</button>

<button className={props.page==='squad' ? 'buttonstrue':'buttons'}>Squad selection</button>
<button className='buttons'>Leagues</button>
<button className='buttons'>Sign out</button>
    </div>
</div>
<img src={playerpic} className='navbarpic'/>
</div>
    </div>
  )
}

export default Subnav