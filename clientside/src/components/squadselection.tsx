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
import { useNavigate } from 'react-router-dom'

interface iuserinfo{
email:string,
points:number
}
interface Ileague{
  league:string,
  _id:string,
  owner:string,
  players:[]
}


function Squadselection() {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt)
  const dispatch=useDispatch()
  const [players,setplayers]=useState<any>([{}])
  const [input,setinput]=useState <string>('')
  const [indexx,setindexx]=useState<any>({})
  const [rerender,setrerender]=useState <boolean>(false)
    const [selectedplayer, setselectedplayer] = useState<any>({});
    const [selectedpos,setselectedpos]=useState<string | undefined>('')
    const [removeplayerinfo,setremoveplayerinfo]=useState();
    const [budget,setbudget]=useState(0)
    const [userinfo,setuserinfo]=useState<iuserinfo>()
    const [run,setrun]=useState<boolean>(false)
    const [runremove,setrunremove]=useState<boolean>(false)
    const [leagues,setleagues]=useState <[]>([])
    const [posted,setposted]=useState()
    const [error,seterror]=useState<boolean>(false)
    const [countplayer,setcountplayer]=useState<number>(0)
    const navigate=useNavigate()
  const loadplayers='http://localhost:5002/loadplayers';
const postplayers='http://localhost:5002/postplayer'
const getplayer='http://localhost:5002/getplayer'
const removePlayerlink='http://localhost:5002/removePlayer'
    const handleLanguageSelection = (i:string) => {
        setIsOpen(false);
      setSelectedLanguage(i);
      console.log({selected:i});

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
    setindexx(changed.players ?changed.players: null)
    setbudget(changed.budget)
    setuserinfo(changed)
    console.log(changed);
  fetch('http://localhost:5002/loadleagues',{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      Authorization:`Bearer ${jwttoken}`
    }}
    )
    .then(res=>res.json())
    .then(res=>
    
    {  console.log(res)
      setleagues(res.res)
    }
    ) 
  
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

      if(changed.error){
        alert(changed.error)
      }
  
setrerender(i=>!i)
    })
    .catch((err)=>{
      alert(err.error)
      console.log(err.error)
    })
}

useEffect(()=>{

  setcountplayer(0)
  seterror(false)
  let counted=0
  let playererr=false
 function postplayer(i){

  if(selectedLanguage && selectedplayer &&
    i.statistics[0].games.position===selectedpos)
    {
        let loopfinished=false
    let arr=[indexx.gk ,indexx.rb ,indexx.rcb,indexx.lcb,
      indexx.lb,indexx.rcm, indexx.cm, indexx.lcm, indexx.rw,
      indexx.st ,indexx.lw]

      
    arr.forEach((k,j)=>{
      if( k &&  k.statistics[0].team.id === i.statistics[0].team.id){
    //  setcountplayer( i=>i+1  )
    counted++
        console.log({countplayerChange:counted})
        console.log({kstats:k.statistics[0].team.id, istats: i.statistics[0].team.id })
      
      if(counted>3){  
        console.log({count:counted,j:j})
        //seterror(true)
        playererr=true
        console.log('error set to true')
        return playererr=true
      }
    }
    if(j==arr.length-1 && counted<3){
 loopfinished=true
 playererr=false
 console.log('finishedd')
    }
    })
console.log(loopfinished,error)
if( loopfinished && playererr==false)
{
  console.log('second loop started')
     if(i.player.id===indexx?.gk?.player.id || i.player.id===indexx?.rb?.player.id || i.player.id===indexx?.rcb?.player.id
       || i.player.id===indexx?.lcb?.player.id || i.player.id===indexx?.lb?.player.id || i.player.id===indexx?.rcm?.player.id
       || i.player.id===indexx?.cm?.player.id || i.player.id===indexx?.lcm?.player.id || i.player.id===indexx?.rw?.player.id
       || i.player.id===indexx?.st?.player.id || i.player.id===indexx?.lw?.player.id || i.nowCost>budget 
      ){
     return null
      }

      else{  
       // console.log(i.player.id, indexx.rcm.id,'ids are not equal')
          
        setindexx(j=>{
          return {
            ...j,
            [selectedplayer]:i
          }
        })
        console.log('postplayer running....',i,selectedplayer)
    
  }}}}
postplayer(posted)
},[run])

useEffect(()=>
{



function removePlayerBackend(i){
  console.log(i)
  console.log(removeplayerinfo)
          setindexx(j=>{
          return {
            ...j,
            [selectedplayer]:null
          }
        })
if(removeplayerinfo && selectedplayer){


  fetch(removePlayerlink, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwttoken}`,
    },
    body: JSON.stringify({player:selectedplayer,cost:removeplayerinfo}),
  })
    .then(response => response.json())
    .then(changed => {
      console.log(changed);
setbudget(changed.budget)
setrerender(i=>!i)
    
    })
  }
}
removePlayerBackend(removeplayerinfo)
},[runremove])



  return (
<>
<Navbar/>
<Subnav page={'squad'}/>
<div className='columndiv2'>
<h2>Squad selection</h2>
<p>Select a maximum of 3 players from a single team</p>
<div className='playerselection'>
  <div className='rowdiv2' style={{padding:'5px 70px', alignItems:'self-end'}}>
<h2 className='greenheader'>Gameweek 28</h2>
<h2 className='greenheader'>£{budget&& budget}m remaining</h2>
  </div>
</div>
</div>
<div className='massivediv'>
<div className='pitchdiv'>
    <img src={pitch} className='pitchpic'/>
    <div className='players'>
<div className='gk'>
            <div className='blankshirtdiv'>
              {
                indexx!=null && indexx.gk && indexx.gk!==null||undefined ?
                <div className='columndiv' onClick={()=>{
                  setremoveplayerinfo(indexx.gk.nowCost)
                  setselectedplayer(gk.position)
                  setrunremove(i=>!i)
                  }}>
                <div className={indexx.gk.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(gk)} />
                <div className='columndiv'>
                  <p className='pitchnameheader'>{indexx.gk.player.name}</p>
                  <p className='pitchnamep'>{indexx.gk.nowCost ? indexx.gk.nowCost :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(gk)}/> 
                
              }
                </div>
</div>
<div className='def'>

{
             indexx!=null &&    indexx.rb && indexx.rb!==null ?
                <div className='columndiv' onClick={()=>{
                  setremoveplayerinfo(indexx.rb.nowCost)
                  setselectedplayer(defence[0].position)
                  setrunremove(i=>!i)                  }}>
                <div className={indexx.rb.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[0])} />
                <div className='columndiv'>
                  <p className='pitchnameheader'>{indexx.rb.player.name}</p>
                  <p className='pitchnamep'>{indexx.rb.nowCost ? indexx.rb.nowCost :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(defence[0])}/> 
                
              }
{
             indexx!=null &&    indexx.rcb && indexx.rcb!==null ?
                <div className='columndiv' onClick={()=>{
                  setremoveplayerinfo(indexx.rcb.nowCost)
                  setselectedplayer(defence[1].position)
                  setrunremove(i=>!i) 
                  }}>
                <div className={indexx.rcb.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[1])} />
                <div className='columndiv'>
                  <p className='pitchnameheader'>{indexx.rcb.player.name}</p>
                  <p className='pitchnamep'>{indexx.rcb.nowCost ? indexx.rcb.nowCost :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(defence[1])}/> 
                
              }
{
             indexx!=null &&    indexx.lcb && indexx.lcb!==null ?
                <div className='columndiv' onClick={()=>{
                  setremoveplayerinfo(indexx.lcb.nowCost)
                  setselectedplayer(defence[2].position)
                  setrunremove(i=>!i)  
                }}>
                <div className={indexx.lcb.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[2])} />
                <div className='columndiv'>
                  <p className='pitchnameheader'>{indexx.lcb.player.name}</p>
                  <p className='pitchnamep'>{indexx.lcb.nowCost ? indexx.lcb.nowCost :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(defence[2])}/> 
                
              }
      
{
            indexx!=null &&     indexx.lb && indexx.lb!==null ?
                <div className='columndiv' onClick={()=>{
                  setremoveplayerinfo(indexx.lb.nowCost)
                  setselectedplayer(defence[3].position)
                  setrunremove(i=>!i)  
                }}>
                <div className={indexx.lb.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(defence[3])} />
                <div className='columndiv'>
                  <p className='pitchnameheader'>{indexx.lb.player.name}</p>
                  <p className='pitchnamep'>{indexx.lb.nowCost ? indexx.lb.nowCost :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(defence[3])}/> 
                
              }
      
      </div>
      <div className='mid'>

      {
          indexx!=null &&       indexx.rcm && indexx.rcm!==null ?
                <div className='columndiv' onClick={()=>{
                  setremoveplayerinfo(indexx.rcm.nowCost)
                  setselectedplayer(midfield[0].position)
                  setrunremove(i=>!i) 
                  }}>
                <div className={indexx.rcm.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(midfield[0])} />
                <div className='columndiv'>
                  <p className='pitchnameheader'>{indexx.rcm.player.name}</p>
                  <p className='pitchnamep'>{indexx.rcm.nowCost ? indexx.rcm.nowCost :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(midfield[0])}/> 
                
              }
      {
           indexx!=null &&      indexx.cm && indexx.cm!==null ?
                <div className='columndiv' onClick={()=>{
                  setremoveplayerinfo(indexx.cm.nowCost)
                  setselectedplayer(midfield[1].position)
                  setrunremove(i=>!i)  
                }}>
                <div className={indexx.cm.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(midfield[1])} />
                <div className='columndiv'>
                  <p className='pitchnameheader'>{indexx.cm.player.name}</p>
                  <p className='pitchnamep'>{indexx.cm.nowCost ? indexx.cm.nowCost :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(midfield[1])}/> 
                
              }
      {
            indexx!=null &&     indexx.lcm && indexx.lcm!==null ?
                <div className='columndiv' onClick={()=>{
                  setremoveplayerinfo(indexx.lcm.nowCost)
                  setselectedplayer(midfield[2].position)
                  setrunremove(i=>!i) 
                }}>
                <div className={indexx.lcm.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(midfield[2])} />
                <div className='columndiv'>
                  <p className='pitchnameheader'>{indexx.lcm.player.name}</p>
                  <p className='pitchnamep'>{indexx.lcm.nowCost ? indexx.lcm.nowCost :0}</p>
                </div> 
              </div>
                        :
                <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(midfield[2])}/> 
                
              }

</div>
<div className='att'>

  {
          indexx!=null &&   indexx.rw && indexx.rw!==null ?
            <div className='columndiv' onClick={()=>{
              setremoveplayerinfo(indexx.rw.nowCost)
              setselectedplayer(attack[0].position)
              setrunremove(i=>!i) 
            }}>
            <div className={indexx.rw.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(attack[0])} />
            <div className='columndiv'>
              <p className='pitchnameheader'>{indexx.rw.player.name}</p>
              <p className='pitchnamep'>{indexx.rw.nowCost ? indexx.rw.nowCost :0}</p>
            </div> 
          </div>
                    :
            <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(attack[0])}/> 
            
          }
  {
           indexx!=null &&  indexx.st && indexx.st!==null ?
            <div className='columndiv' onClick={()=>{
              setremoveplayerinfo(indexx.st.nowCost)
              setselectedplayer(attack[1].position)
              setrunremove(i=>!i) 
            }}>
            <div className={indexx.st.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(attack[1])} />
            <div className='columndiv'>
              <p className='pitchnameheader'>{indexx.st.player.name}</p>
              <p className='pitchnamep'>{indexx.st.nowCost ? indexx.st.nowCost :0}</p>
            </div> 
          </div>
                    :
            <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(attack[1])}/> 
            
          }
  {
          indexx!=null &&   indexx.lw && indexx.lw!==null ?
            <div className='columndiv' onClick={()=>{
              setremoveplayerinfo(indexx.lw.nowCost)
              setselectedplayer(attack[2].position)
              setrunremove(i=>!i) 
            }}>
            <div className={indexx.lw.statistics[0].team.name.toLowerCase().replace(/\s+/g, '')} onClick={()=>clicked(attack[2])} />
            <div className='columndiv'>
              <p className='pitchnameheader'>{indexx.lw.player.name}</p>
              <p className='pitchnamep'>{indexx.lw.nowCost ? indexx.lw.nowCost :0}</p>
            </div> 
          </div>
                    :
            <img src={blankshirt} className={'blankshirt'} onClick={()=>clicked(attack[2])}/> 
            
          }
          
    </div>

    </div>
</div>
<div className='columndiv' style={{width:'30%'}}>
<div className='settingsdiv' style={{marginTop: '-87px',width:'100%'}}> 
<div className='playerselection'>
<h3 className='largeheader' style={{  alignSelf: 'self-start',padding:' 0px 15px'}} >
  {userinfo&&userinfo.email}</h3>
</div>
<div className='columndiv' style={{boxShadow:' 0px 13px 13px #ececec'}}>
<div className='purplediv'>
  <p className='pneon'>My Leagues</p>
  </div>
  <div className='rowdiv' style={{  justifyContent: 'space-between', width: '100%',padding: '6%'}}>
  <h4 className='boldp'>League name</h4>
  <h4 className='boldp'>Active players</h4>
</div>
  <div className='rowdiv' style={{  justifyContent: 'space-between', width: '100%',padding: '6%'}}>
{
  leagues && leagues.slice(0,2).map((i:Ileague)=>{
    return (
      <>
        <h4 className='boldp'>{i.league&& i.league}</h4>
  <h4 className='boldp'>{i.players&& i.players.length}</h4>

      </>
    )
  })
}
</div>
{
  leagues.length<2&&
  <button className='buttoncardpurple' style={{width:'100%'}}
   onClick={()=>{
    if( leagues.length==0){

      navigate('/leagues/createleague')
    }
    else{ 
      navigate('/leagues/viewleagues')
    }
    
    }}>{  leagues.length>0? 'View Leagues': 'Join leagues'}</button>
}

  </div>
</div>
<div className='settingsdiv' style={{marginTop: '25px',width:'100%'}}>
<div className='playerselection'>

<h3 className='largeheader'style={{  alignSelf: 'self-start',padding:' 0px 15px'}}  >Player selection</h3>
</div>
<div className='playerselection2'>
  <div className='purplediv'>
<h4 className='pneon'>View</h4>
  </div>
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
<div style={{    overflow: 'scroll',
    height:'250px'}}>
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
  
      players.playerArr.map((j:any)=>{
        if(selectedLanguage==='' || selectedLanguage===j.statistics[0].games.position ){
  if (    input.length== 0 || j.player.name.toLowerCase().includes(input.toLowerCase().replace(/\s+/g, '')) || j.player.firstname.toLowerCase().includes(input.toLowerCase().replace(/\s+/g, '')) || j.player.lastname.toLowerCase().includes(input.toLowerCase().replace(/\s+/g, '')) ) {
    return (
      <tr className="playerdiv" onClick={async ()=>{
      await  setposted(j)
       await setrun(i=>!i)
       await postplayer(j)
        }}>
    
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
</div>
</div>
</>  )
}
export default Squadselection;