import React from 'react'
import pitch from '../images/footballpitch.png'
import blankshirt from '../images/blankshirt.png'
function Chooseleague() {

    const gk=['gk']
    const defence=['rb','cb','cb','lb']
    const midfield=['cdm','cm','cm']
    const attack=['lw','rw','st']
  return (
<>
<div className='massivediv'>
<div className='pitchdiv'>
    <img src={pitch} className='pitchpic'/>
    <div className='players'>
<div className='gk'>
            <div className='blankshirtdiv'>
                <img src={blankshirt} className='blankshirt'/>
                </div>
</div>
<div className='def'>

    {
        
        defence.map((i)=>{
            return (
                <div className='blankshirtdiv'>
                <img src={blankshirt} className='blankshirt'/>
                </div>
            )
        })
    }
      
      </div>
      <div className='mid'>

      {  midfield.map((i)=>{
          return (
              <div className='blankshirtdiv'>
                <img src={blankshirt} className='blankshirt'/>
                </div>
            )
        })
}
</div>
<div className='att'>

 {       attack.map((i)=>{
     return (
         <div className='blankshirtdiv'>
                <img src={blankshirt} className='blankshirt'/>
                </div>
            )
        })
    }
    </div>

    </div>
</div>
<div className='settingsdiv'>
<div className='playerselection'>
<input/>
<input/>
<input/>
</div>

</div>
</div>
</>  )
}
export default Chooseleague;