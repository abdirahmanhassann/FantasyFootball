import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { league } from '../redux/redux'
import Footer from './Reusable/Footer.tsx'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'
import CopyToClipBoard from './Reusable/CopytoClipBoard.ts'
import moment from "moment/moment";
import { useNavigate } from 'react-router-dom'

interface Ileague{
    league:string;
    _id:string;
    owner:string;
}
interface Iplayers
{email:string,
    points:number,
    budget:number,
    _id:string
}
  
function Viewleague() {
    const [league2,setleague]=useState<Ileague>()
    const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt)
    const leagueId=useSelector((State:any)=>State.reducer.leaguestatus.league)
    const [players,setplayers]=useState<Iplayers[]>([])
    const [ifleave,setifleave]=useState<boolean>(false);
    const navigate=useNavigate();
    const dispatch=useDispatch()
        useEffect(()=>{
function fetchleague(){
    fetch('http://localhost:5002/findleague',{
        method:'POST',
        headers:{
            'content-Type':'application/json',
            Authorization:`Bearer ${jwttoken}`
    
        },
        body: JSON.stringify({league:leagueId})
    }
        )
        .then(res=>res.json())
        .then(res=>{
            
        const sort=res[0].playerss
         
 sort.sort((a, b) => b.points - a.points);
            
            setleague(res)
            console.log(res._id)
        setplayers(sort)
        })
                
}
fetchleague()

    },[])


function leaveleague(){
fetch('http://localhost:5002/leaveleague',{
    method:'DELETE',
    headers:{
        'content-Type':'application/json',
        authorization:`Bearer ${jwttoken}`
    }
    ,body:JSON.stringify({leagueid:leagueId})
})
.then(res=>{
    navigate('/leagues/viewleagues')
    dispatch(league(''))
})
}



  return (
<>
<Navbar/>
        <Subnav page={'leagues'}/>
        <div className='settingsdiv'
           style={{
           width: 'fit-content',marginLeft: '61px',marginTop:'10px',
          boxShadow:'none',maxWidth:'1200px' ,  margin: 'auto',    padding: '10px'}}>
        <div className='rowdiv' style={{    
            justifyContent: 'space-between',
            padding: '20px 70px',
            width:'100%',
            maxWidth: '950px',
            alignItems: 'baseline'
            }}>
                <div className='rowdiv'>

 <h2>{league2?.[0]?.league}</h2>
 <h2 style={{fontWeight:'200'}}>{league2?.[0]?._id}</h2>
                </div>

 <div className='rowdiv'>
<button className='buttoncard'
 onClick={() => { CopyToClipBoard(leagueId,'League ID')}}>Invite friends to league</button>
<button className='buttoncardpurple'
 onClick={leaveleague}>Leave this league</button>
 </div>
        </div>
        
          <div className='settingsdiv'
           style={{
           width: '800px',marginLeft: '61px',marginTop:'0px'}}>
                <div className='purplediv'>
  <p className='pneon'>{league2?.[0].owner}'s league</p>
  <p className='pneon'> Created {league2&& moment(league2[0].createdAt).fromNow()}</p>
  </div>
  <table>
    <tr className='playerdiv'>
    <th style={{width:'9%'}}>rank</th>
    <th>Player name</th>
    <th>Points</th>
    <th>Remainig budget</th>
    </tr>
    {
players&&
players.map((i,j=0)=>{
    j++
  return(
<>
<tr className="playerdiv">
    <td style={{width:'9%'}}>{j}</td>
  <td>{i.email} </td>
  <td>{i.points&&i.points} </td>
  <td>£{i.budget&&i.budget}m </td>

</tr>
</>
  )
})
    }
  </table>
        </div>
        </div>
<Footer/>
</>

  )
}

export default Viewleague