import React, { useEffect, useState } from 'react'
import pitch from '../images/footballpitch.png'
import blankshirt from '../images/blankshirt.png'
import { FormControl } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch, useSelector } from 'react-redux';
import arsenal from '../images/plteamshirts/arsenal.webp';
import astonvilla from '../images/plteamshirts/astonvilla.webp';
import bournemouth from '../images/plteamshirts/bournemouth.webp'
import brentford from '../images/plteamshirts/brentford.webp'
import brighton from '../images/plteamshirts/brighton.webp'
import chelsea from '../images/plteamshirts/chelsea.webp'
import crystalpalace from '../images/plteamshirts/crystalpalace.webp'
import everton from '../images/plteamshirts/everton.webp'
import fulham from '../images/plteamshirts/fulham.webp'
import leeds from '../images/plteamshirts/leeds.webp'
import leicester from '../images/plteamshirts/leicester.webp'
import liverpool from '../images/plteamshirts/liverpool.webp'
import manchestercity from '../images/plteamshirts/manchestercity.webp'
import manchesterunited from '../images/plteamshirts/manchesterunited.webp'
import newcastle from '../images/plteamshirts/newcastle.webp'
import nottinghamforrest from '../images/plteamshirts/nottinghamforrest.webp'
import southampton from '../images/plteamshirts/southampton.webp'
import tottenham from '../images/plteamshirts/tottenham.webp'
import westham from '../images/plteamshirts/westham.webp'
import wolves from '../images/plteamshirts/wolves.webp'
function Chooseleague() {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt)
  const dispatch=useDispatch()
  const [players,setplayers]=useState<any>([{}])
  const loadplayers='http://localhost:5002/loadplayers'
    const handleLanguageSelection = (language) => {
        setIsOpen(false);
      setSelectedLanguage(language);
    }

    useEffect(()=>{
        function request(){
fetch(loadplayers,{
    method:'GET',
    headers:{
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwttoken}`,
        }})
.then((res)=>res.json())
.then((res)=>{
  console.log(res)
  setplayers(res)
})
        }
        request()
    },[])

    const gk=['gk']
    const defence=['rb','cb','cb','lb']
    const midfield=['cdm','cm','cm']
    const attack=['rw','st','lw']
const positions=['Goalkeeper','defender','midfielder','attacker']
function clicked(c){
    
}

  return (
<>
<div className='massivediv'>
<div className='pitchdiv'>
    <img src={pitch} className='pitchpic'/>
    <div className='players'>
<div className='gk'>
            <div className='blankshirtdiv'>
                <img src={blankshirt} className='blankshirt'onClick={()=>clicked('gk')}/>
                </div>
</div>
<div className='def'>

    {
        
        defence.map((i)=>{
            return (
                <div className='blankshirtdiv'>
                <img src={blankshirt} className='blankshirt' onClick={()=>clicked(i)} />
                </div>
            )
        })
    }
      
      </div>
      <div className='mid'>

      {  midfield.map((i)=>{
          return (
              <div className='blankshirtdiv'>
                <img src={blankshirt} className='blankshirt' onClick={()=>clicked(i)}/>
                </div>
            )
        })
}
</div>
<div className='att'>

 {       attack.map((i)=>{
     return (
         <div className='blankshirtdiv'>
                <img src={blankshirt} className='blankshirt' onClick={()=>clicked(i)}/>
                </div>
            )
        })
    }
    </div>

    </div>
</div>
<div className='settingsdiv'>
<div className='playerselection'>
<h3 className='largeheader'>Player selection</h3>
</div>
<div className='playerselection2'>
<h4 className='largeheader'>View</h4>
<details open={isOpen} onClick={() => setIsOpen(i=>!i)}>
      <summary className="summary" aria-haspopup="true" style={{width:'100%',border:'none'}}>
        {selectedLanguage ? selectedLanguage : 'All Positions'}
      </summary>
      {
          isOpen===false&&  
          <div className="SelectMenu">
        <div className="SelectMenu-modal">
          <header className="SelectMenu-header">
            <h3 className="SelectMenu-title">
              Positions
            </h3>
          </header>

          <div className="SelectMenu-list">
            <div className="SelectMenu-item" onClick={() => handleLanguageSelection('')}>
              All positions
            </div>
            </div>
{
    positions.map((i)=>{
        return (

            <div className="SelectMenu-list">
        <div className="SelectMenu-item" onClick={() => handleLanguageSelection(i)}>
          <p >{i}</p>
        </div>
          </div>
            )
            
        })
}
        </div>
      </div>
}
    </details>
<input type='text' placeholder='enter player' className='input2'/>
{
  players.playerArr &&
  players.playerArr.slice(0,4).map((i)=>{
    return (
i.response.map((j)=>{
  return (
    <>
    <div className='playerdiv'>

    <div className={ j.statistics[0].team.name.toLowerCase().replace(/\s+/g,'')} >
      </div>
      <p>{j.player.firstname} ,{j.player.lastname}</p>
    </div>
  </>
  )
}))
  })
}
</div>
        </div>
</div>
</>  )
}
export default Chooseleague;