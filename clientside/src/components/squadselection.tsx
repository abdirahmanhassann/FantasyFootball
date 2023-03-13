import React, { useEffect, useState } from 'react'
import pitch from '../images/footballpitch.png'
import blankshirt from '../images/shirtplaceholder.webp'
import { FormControl } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'

function Squadselection() {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt)
  const dispatch=useDispatch()
  const [players,setplayers]=useState<any>([{}])
  const [input,setinput]=useState <string>('')
  const [indexx,setindexx]=useState<any>({})
  const [rerender,setrerender]=useState <boolean>(false)
    const [selectedplayer, setselectedplayer] = useState<object>({});
    const [selectedpos,setselectedpos]=useState<string | undefined>('')
  const loadplayers='http://localhost:5002/loadplayers';
const postplayers='http://localhost:5002/postplayer'
const getplayer='http://localhost:5002/getplayer'
const removePlayerlink='http://localhost:5002/removePlayer'
    const handleLanguageSelection = (language) => {
        setIsOpen(false);
      setSelectedLanguage(language);
      console.log(selectedLanguage);
      
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
.then(()=>{

  fetch(getplayer, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwttoken}`,
    },
  })
  .then(response => response.json())
  .then(changed => {
    setindexx(changed)
    console.log(changed);

  })
})

        }
        request()
    },[rerender])

    const gk={position:'gk',exact:'Goalkeeper',player:''}
    const defence=[{position:'rb',exact:'Defender'},{position:'rcb',exact:'Defender'},{position:'lcb',exact:'Defender'},{position:'lb',exact:'Defender'}]
    const midfield=[{position:'rcm',exact:'Midfielder'},{position:'cm',exact:'Midfielder'},{position:'lcm',exact:'Midfielder'}]
    const attack=[{position:'rw',exact:'Attacker'},{position:'st',exact:'Attacker'},{position:'lw',exact:'Attacker'}]
const positions=['Goalkeeper',"Defender","Midfielder","Attacker"]
function clicked(c){
    console.log(c)
    setSelectedLanguage(c.exact)
setselectedplayer(c.position)
setselectedpos(c.exact)
}
function changed(e){
setinput(e.target.value)
console.log(input)
}

function postplayer(i){

  if(selectedLanguage && selectedplayer &&
 i.statistics[0].games.position===selectedpos){
i={
  ...i,
  position:selectedplayer
}
console.log(selectedplayer,i)
  }
  fetch(postplayers, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwttoken}`,
    },
    body: JSON.stringify({team:i}),
  })
    .then(response => response.json())
    .then(changed => {
      console.log(changed);
setindexx(changed);
setrerender(i=>!i)
    })
}

function removePlayer(i){
  setselectedplayer(i.position)
  console.log(selectedplayer)
  fetch(removePlayerlink, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwttoken}`,
    },
    body: JSON.stringify({player:selectedplayer}),
  })
    .then(response => response.json())
    .then(changed => {
      console.log(changed);
setindexx(changed);
setrerender(i=>!i)
    })
    
}

  return (
<>
<Navbar/>
<Subnav page={'squad'}/>
<div className='columndiv2'>
<h2>Squad seletion</h2>
<p>Select a maximum of 3 players from a single team</p>
<div className='playerselection'>
<h2>Gameweek 28</h2>
</div>
</div>
<div className='massivediv'>
<div className='pitchdiv'>
    <img src={pitch} className='pitchpic'/>
    <div className='players'>
<div className='gk'>
            <div className='blankshirtdiv'>
              {
                 indexx.gk && indexx.gk!==null ?
                <div className='columndiv' onClick={()=>removePlayer(gk)}>
                <div className={indexx.gk.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(gk)} />
                <div className='rowdiv'>
                  <p className='boldp'>{indexx.gk.player.lastname}</p>
                  <p className='lightp'>{indexx.gk.statistics[0].games.rating ? indexx.gk.statistics[0].games.rating :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(gk)}/> 
                
              }
                </div>
</div>
<div className='def'>

{
                indexx.rb && indexx.rb!==null ?
                <div className='columndiv' onClick={()=>removePlayer(defence[0])}>
                <div className={indexx.rb.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[0])} />
                <div className='rowdiv'>
                  <p className='boldp'>{indexx.rb.player.lastname}</p>
                  <p className='lightp'>{indexx.rb.statistics[0].games.rating ? indexx.rb.statistics[0].games.rating :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(defence[0])}/> 
                
              }
{
                indexx.rcb && indexx.rcb!==null ?
                <div className='columndiv' onClick={()=>removePlayer(defence[1])}>
                <div className={indexx.rcb.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[1])} />
                <div className='rowdiv'>
                  <p className='boldp'>{indexx.rcb.player.lastname}</p>
                  <p className='lightp'>{indexx.rcb.statistics[0].games.rating ? indexx.rcb.statistics[0].games.rating :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(defence[1])}/> 
                
              }
{
                indexx.lcb && indexx.lcb!==null ?
                <div className='columndiv' onClick={()=>removePlayer(defence[2])}>
                <div className={indexx.lcb.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[2])} />
                <div className='rowdiv'>
                  <p className='boldp'>{indexx.lcb.player.lastname}</p>
                  <p className='lightp'>{indexx.lcb.statistics[0].games.rating ? indexx.lcb.statistics[0].games.rating :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(defence[2])}/> 
                
              }
      
{
                indexx.lb && indexx.lb!==null ?
                <div className='columndiv' onClick={()=>removePlayer(defence[3])}>
                <div className={indexx.lb.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[3])} />
                <div className='rowdiv'>
                  <p className='boldp'>{indexx.lb.player.lastname}</p>
                  <p className='lightp'>{indexx.lb.statistics[0].games.rating ? indexx.lb.statistics[0].games.rating :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(defence[3])}/> 
                
              }
      
      </div>
      <div className='mid'>

      {
                indexx.rcm && indexx.rcm!==null ?
                <div className='columndiv' onClick={()=>removePlayer(midfield[0])}>
                <div className={indexx.rcm.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(midfield[0])} />
                <div className='rowdiv'>
                  <p className='boldp'>{indexx.rcm.player.lastname}</p>
                  <p className='lightp'>{indexx.rcm.statistics[0].games.rating ? indexx.rcm.statistics[0].games.rating :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(midfield[0])}/> 
                
              }
      {
                indexx.cm && indexx.cm!==null ?
                <div className='columndiv' onClick={()=>removePlayer(midfield[1])}>
                <div className={indexx.cm.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(midfield[1])} />
                <div className='rowdiv'>
                  <p className='boldp'>{indexx.cm.player.lastname}</p>
                  <p className='lightp'>{indexx.cm.statistics[0].games.rating ? indexx.cm.statistics[0].games.rating :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(midfield[1])}/> 
                
              }
      {
                indexx.lcm && indexx.lcm!==null ?
                <div className='columndiv' onClick={()=>removePlayer(midfield[2])}>
                <div className={indexx.lcm.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(midfield[2])} />
                <div className='rowdiv'>
                  <p className='boldp'>{indexx.lcm.player.lastname}</p>
                  <p className='lightp'>{indexx.lcm.statistics[0].games.rating ? indexx.lcm.statistics[0].games.rating :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(midfield[2])}/> 
                
              }

</div>
<div className='att'>

  {
            indexx.rw && indexx.rw!==null ?
            <div className='columndiv' onClick={()=>removePlayer(attack[0])}>
            <div className={indexx.rw.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(attack[0])} />
            <div className='rowdiv'>
              <p className='boldp'>{indexx.rw.player.lastname}</p>
              <p className='lightp'>{indexx.rw.statistics[0].games.rating ? indexx.rw.statistics[0].games.rating :0}</p>
            </div> 
          </div>
                    :
            <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(attack[0])}/> 
            
          }
  {
            indexx.st && indexx.st!==null ?
            <div className='columndiv' onClick={()=>removePlayer(attack[1])}>
            <div className={indexx.st.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(attack[1])} />
            <div className='rowdiv'>
              <p className='boldp'>{indexx.st.player.lastname}</p>
              <p className='lightp'>{indexx.st.statistics[0].games.rating ? indexx.st.statistics[0].games.rating :0}</p>
            </div> 
          </div>
                    :
            <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(attack[1])}/> 
            
          }
  {
            indexx.lw && indexx.lw!==null ?
            <div className='columndiv' onClick={()=>removePlayer(attack[2])}>
            <div className={indexx.lw.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(attack[2])} />
            <div className='rowdiv'>
              <p className='boldp'>{indexx.lw.player.lastname}</p>
              <p className='lightp'>{indexx.lw.statistics[0].games.rating ? indexx.lw.statistics[0].games.rating :0}</p>
            </div> 
          </div>
                    :
            <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(attack[2])}/> 
            
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
<input type='text' placeholder='enter player' className='input2' onChange={e=>changed(e)}/>
<table>
  <tr>
  </tr>
<tr className='playerdiv'>
      <th>Team</th>
      <th>Player</th>
      <th>Rating</th>
      <th>Apps</th>
    </tr>
{
  players.playerArr &&
  
      players.playerArr.map((j)=>{
        
        let fullname=`${j.player.firstname} ${j.player.lastname}`
        if(selectedLanguage==='' || selectedLanguage===j.statistics[0].games.position ){
  if (    input.length== 0 || j.player.name.toLowerCase().includes(input.toLowerCase().replace(/\s+/g, '')) || j.player.firstname.toLowerCase().includes(input.toLowerCase().replace(/\s+/g, '')) || j.player.lastname.toLowerCase().includes(input.toLowerCase().replace(/\s+/g, '')) ) {
    return (
      <tr key={j.player.id} className="playerdiv" onClick={()=>postplayer(j)}>
    
        <td>
        <div className={j.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')}></div>
        </td>
        <td>
        <div className='columndiv'>

        {j.player.lastname.length < 8 ? (
          <p className="boldp">{j.player.name}</p>
          ) : (
            <p className="boldp">{j.player.name.slice(0, 8)}...</p>
            )}
 <div className='rowdiv'>
<p className='lightp'>{j.statistics[0].team.name.slice(0,3).toUpperCase()}</p>
{
j.statistics[0].games.position == 'Goalkeeper'?
<p className='lightp'>GK</p>
:
<p className='lightp'>{j.statistics[0].games.position.slice(0,3).toUpperCase()}</p>
}
 </div>
            </div>
    </td>
    <td>
      {j.statistics[0].games.rating == null ? (
        <p className="lightp">0</p>
      ) : (
        <p className="lightp">{j.statistics[0].games.rating.slice(0, 3)}</p>
      )}
    </td>
    <td>
      {j.statistics[0].games.appearences == null ? (
        <p className="lightp">0</p>
      ) : (
        <p className="lightp">{j.statistics[0].games.appearences}</p>
      )}
      
    </td>
  </tr>
  )}}
})
}
</table>
</div>
        </div>
</div>

</>  )
}
export default Squadselection;