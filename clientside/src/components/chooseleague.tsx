import React, { useEffect, useState } from 'react'
import pitch from '../images/footballpitch.png'
import blankshirt from '../images/shirtplaceholder.webp'
import { FormControl } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch, useSelector } from 'react-redux';
function Chooseleague() {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt)
  const dispatch=useDispatch()
  const [players,setplayers]=useState<any>([{}])
  const [input,setinput]=useState <string>('')
  const [indexx,setindexx]=useState<number>(0)
  const [selectedplayer, setselectedplayer] = useState<object>({});
  const [team,setteam]=useState<object[]>([{}])
  const loadplayers='http://localhost:5002/loadplayers';
const postplayers='http://localhost:5002/postplayer'
const getplayer='http://localhost:5002/getplayer'
let count ={
  count:0,
  count2:0,
  count3:0,
  count4:0,
  coun5:0,
  count6:0,
  count7:0,
  count8:0,
  count9:0,
  count10:0,
  count11:0
};
let index={
  index:false,
  index2:false,
  index3:false,
  index4:false,
  index5:false,
  index6:false,
  index7:false,
  index8:false,
  index9:false,
  index10:false,
  index11:false
}
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
    setteam(changed)
    console.log(changed);
    
  })
})


        }
        request()
    },[])

    const gk={position:'gk',exact:'Goalkeeper',player:''}
    const defence=[{position:'rb',exact:'Defender'},{position:'lcb',exact:'Defender'},{position:'rcb',exact:'Defender'},{position:'lb',exact:'Defender'}]
    const midfield=[{position:'rcm',exact:'Midfielder'},{position:'cm',exact:'Midfielder'},{position:'lcm',exact:'Midfielder'}]
    const attack=[{position:'RW',exact:'Attacker'},{position:'ST',exact:'Attacker'},{position:'LW',exact:'Attacker'}]
const positions=['Goalkeeper',"Defender","Midfielder","Attacker"]
function clicked(c){
    console.log(c)
    setSelectedLanguage(c.exact)
setselectedplayer(c.position)
}
function changed(e){
setinput(e.target.value)
console.log(input)
}


function postplayer(i){
  if(selectedLanguage){
i={
  ...i,
  position:selectedplayer
}
console.log(65,i)
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
      setteam(changed)
      console.log(changed);

    })
  }

  return (
<>
<div className='massivediv'>
<div className='pitchdiv'>
    <img src={pitch} className='pitchpic'/>
    <div className='players'>
<div className='gk'>
            <div className='blankshirtdiv'>
            {
  team ?
  
  team.map((i:any)=>{
    count.count++
    if(i.position==='gk'){
      index.index=true
      return (
        <div className='columndiv'>
        <div className={i.member.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(gk)} />
        <div className='rowdiv'>
          <p className='boldp'>{i.member.player.lastname}</p>
          <p className='lightp'>{i.member.statistics[0].games.rating ? i.member.statistics[0].games.rating :0}</p>
        </div> 
      </div>
      )
    }
    if(index.index==false && count.count=== team.length){
      return   <img src={blankshirt} className='blankshirt' onClick={()=>clicked(gk)} />
    }
  })
  :
  
  <img src={blankshirt} className='blankshirt' onClick={()=>clicked(gk)} />
}

                </div>
</div>
<div className='def'>
{ 
  team ?
  
  team.map((i:any)=>{
    count.count2++
    if(i.position==='rb'){
      index.index2=true
      return (
        <div className='columndiv'>
        <div className={i.member.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[0])}/>
        <div className='rowdiv'>
          <p className='boldp'>{i.member.player.lastname}</p>
          <p className='lightp'>{i.member.statistics[0].games.rating ? i.member.statistics[0].games.rating :0}</p>
        </div> 
      </div>
      )
    }
    if(index.index2==false && count.count2=== team.length){
      return   <img src={blankshirt} className='blankshirt' onClick={()=>clicked(defence[0])} />
    }
  })
  :
  
  <img src={blankshirt} className='blankshirt' onClick={()=>clicked(defence[0])} />
}

{ 
  team ?
  
  team.map((i:any)=>{
    count.count3++
    if(i.position==='rcb'){
      index.index3=true
      console.log(i.position)
      return (
        <div className='columndiv'>
        <div className={i.member.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[1])}/>
        <div className='rowdiv'>
          <p className='boldp'>{i.member.player.lastname}</p>
          <p className='lightp'>{i.member.statistics[0].games.rating ? i.member.statistics[0].games.rating :0}</p>
        </div> 
      </div>
      )
    }
    if(index.index3==false && count.count3=== team.length){
      return   <img src={blankshirt} className='blankshirt' onClick={()=>clicked(defence[1])} />
    }
  })
  :
  
  <img src={blankshirt} className='blankshirt' onClick={()=>clicked(defence[1])} />
}

{ 
  team ?
  
  team.map((i:any)=>{
    count.count4++
    if(i.position==='lcb'){
      index.index4=true
      console.log(i.position)
      return (
        <div className='columndiv'>
        <div className={i.member.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[1])}/>
        <div className='rowdiv'>
          <p className='boldp'>{i.member.player.lastname}</p>
          <p className='lightp'>{i.member.statistics[0].games.rating ? i.member.statistics[0].games.rating :0}</p>
        </div> 
      </div>
      )
    }
    if(index.index4==false && count.count4=== team.length){
      return   <img src={blankshirt} className='blankshirt' onClick={()=>clicked(defence[1])} />
    }
  })
  :
  
  <img src={blankshirt} className='blankshirt' onClick={()=>clicked(defence[1])} />
}

{ 
  team ?
  
  team.map((i:any)=>{
    count.coun5++
    if(i.position==='lb'){
      index.index5=true
      console.log(i.position)
      return (
        <div className='columndiv'>
        <div className={i.member.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[1])}/>
        <div className='rowdiv'>
          <p className='boldp'>{i.member.player.lastname}</p>
          <p className='lightp'>{i.member.statistics[0].games.rating ? i.member.statistics[0].games.rating :0}</p>
        </div> 
      </div>
      )
    }
    if(index.index5==false && count.coun5=== team.length){
      return   <img src={blankshirt} className='blankshirt' onClick={()=>clicked(defence[1])} />
    }
  })
  :
  
  <img src={blankshirt} className='blankshirt' onClick={()=>clicked(defence[1])} />
}



    {/* {
        
        defence.map((i)=>{
            return (
                <div className='blankshirtdiv'>
                <img src={blankshirt} className='blankshirt' onClick={()=>clicked(i)} />
                </div>
            )
        })
    } */}
      
      </div>
      <div className='mid'>
      { 
  team ?
  
  team.map((i:any)=>{
    count.count6++
    if(i.position==='rcm'){
      index.index6=true
      console.log(i.position)
      return (
        <div className='columndiv'>
        <div className={i.member.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(midfield[0])}/>
        <div className='rowdiv'>
          <p className='boldp'>{i.member.player.lastname}</p>
          <p className='lightp'>{i.member.statistics[0].games.rating ? i.member.statistics[0].games.rating :0}</p>
        </div> 
      </div>
      )
    }
    if(index.index6==false && count.count6=== team.length){
      return   <img src={blankshirt} className='blankshirt' onClick={()=>clicked(midfield[0])} />
    }
  })
  :
  
  <img src={blankshirt} className='blankshirt' onClick={()=>clicked(midfield[0])} />
}
    
      { 
  team ?
  
  team.map((i:any)=>{
    count.count7++
    if(i.position==='cm'){
      index.index7=true
      console.log(i.position)
      return (
        <div className='columndiv'>
        <div className={i.member.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(midfield[1])}/>
        <div className='rowdiv'>
          <p className='boldp'>{i.member.player.lastname}</p>
          <p className='lightp'>{i.member.statistics[0].games.rating ? i.member.statistics[0].games.rating :0}</p>
        </div> 
      </div>
      )
    }
    if(index.index7==false && count.count7=== team.length){
      return   <img src={blankshirt} className='blankshirt' onClick={()=>clicked(midfield[1])} />
    }
  })
  :
  
  <img src={blankshirt} className='blankshirt' onClick={()=>clicked(midfield[1])} />
}
      { 
  team ?
  
  team.map((i:any)=>{
    count.count8++
    if(i.position==='lcm'){
      index.index8=true
      console.log(i.position)
      return (
        <div className='columndiv'>
        <div className={i.member.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(midfield[2])}/>
        <div className='rowdiv'>
          <p className='boldp'>{i.member.player.lastname}</p>
          <p className='lightp'>{i.member.statistics[0].games.rating ? i.member.statistics[0].games.rating :0}</p>
        </div> 
      </div>
      )
    }
    if(index.index8==false && count.count8=== team.length){
      return   <img src={blankshirt} className='blankshirt' onClick={()=>clicked(midfield[2])} />
    }
  })
  :
  
  <img src={blankshirt} className='blankshirt' onClick={()=>clicked(midfield[2])} />
}
    
</div>
<div className='att'>

{ 
  team ?
  
  team.map((i:any)=>{
    count.count9++
    if(i.position==='RW'){
      index.index9=true
      console.log(i.position)
      return (
        <div className='columndiv'>
        <div className={i.member.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(attack[0])}/>
        <div className='rowdiv'>
          <p className='boldp'>{i.member.player.lastname}</p>
          <p className='lightp'>{i.member.statistics[0].games.rating ? i.member.statistics[0].games.rating :0}</p>
        </div> 
      </div>
      )
    }
    if(index.index9==false && count.count9=== team.length){
      return   <img src={blankshirt} className='blankshirt' onClick={()=>clicked(attack[0])} />
    }
  })
  :
  
  <img src={blankshirt} className='blankshirt' onClick={()=>clicked(attack[0])} />
}
    
{ 
  team ?
  
  team.map((i:any)=>{
    count.count10++
    if(i.position==='ST'){
      index.index10=true
      console.log(i.position)
      return (
        <div className='columndiv'>
        <div className={i.member.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(attack[1])}/>
        <div className='rowdiv'>
          <p className='boldp'>{i.member.player.lastname}</p>
          <p className='lightp'>{i.member.statistics[0].games.rating ? i.member.statistics[0].games.rating :0}</p>
        </div> 
      </div>
      )
    }
    if(index.index10==false && count.count10=== team.length){
      return   <img src={blankshirt} className='blankshirt' onClick={()=>clicked(attack[1])} />
    }
  })
  :
  
  <img src={blankshirt} className='blankshirt' onClick={()=>clicked(attack[1])} />
}
{ 
  team ?
  
  team.map((i:any)=>{
    count.count11++
    if(i.position==='LW'){
      index.index11=true
      console.log(i.position)
      return (
        <div className='columndiv'>
        <div className={i.member.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(attack[2])}/>
        <div className='rowdiv'>
          <p className='boldp'>{i.member.player.lastname}</p>
          <p className='lightp'>{i.member.statistics[0].games.rating ? i.member.statistics[0].games.rating :0}</p>
        </div> 
      </div>
      )
    }
    if(index.index11==false && count.count11=== team.length){
      return   <img src={blankshirt} className='blankshirt' onClick={()=>clicked(attack[2])} />
    }
  })
  :
  
  <img src={blankshirt} className='blankshirt' onClick={()=>clicked(attack[2])} />
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
  
  players.playerArr.map((i)=>{
    return (
      i.response.map((j)=>{
        
        let fullname=`${j.player.firstname} ${j.player.lastname}`
        if(selectedLanguage==='' || selectedLanguage===j.statistics[0].games.position ){
  if (    input.length== 0 || fullname.toLowerCase().includes(input.toLowerCase().replace(/\s+/g, '')) || j.player.firstname.toLowerCase().includes(input.toLowerCase().replace(/\s+/g, '')) || j.player.lastname.toLowerCase().includes(input.toLowerCase().replace(/\s+/g, '')) ) {
    return (
      <tr key={j.player.id} className="playerdiv" onClick={()=>postplayer(j)}>
    
        <td>
        <div className={j.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')}></div>
        </td>
        <td>
        <div className='columndiv'>

        {j.player.lastname.length < 8 ? (
          <p className="boldp">{j.player.lastname}</p>
          ) : (
            <p className="boldp">{j.player.lastname.slice(0, 8)}...</p>
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
}))
  })
}
</table>
</div>
        </div>
</div>
</>  )
}
export default Chooseleague;