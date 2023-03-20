import React from 'react'
import playerpic from '../../images/navbarpic.png'
function SubnavSignedOut() {
  return (
    <div className='subnav'>
<div className='rowdiv2'>
<div className='columndiv'>
    <h1 className='headerdiv'>Fantasy Premier league</h1>
</div>
<img src={playerpic} className='navbarpic'/>
</div>
    </div>
  )
}

export default SubnavSignedOut