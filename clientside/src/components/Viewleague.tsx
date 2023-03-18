import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { league } from '../redux/redux'
import Footer from './Reusable/Footer.tsx'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'
import CopyToClipBoard from './Reusable/CopytoClipBoard.ts'
import moment from "moment/moment";

interface Ileague{
    league:string;
    _id:string;
    owner:string;
    players:[{email:string,points:number,budget:number }]
  }
  
function Viewleague() {
    const [league,setleague]=useState<Ileague>()
    const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt)
    const leagueId=useSelector((State:any)=>State.reducer.leaguestatus.league)

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
            
            console.log(res)
            setleague(res)})
                
}
fetchleague()

    },[])
  return (
<>
<Navbar/>
        <Subnav/>
        <div className='rowdiv' style={{    
            justifyContent: 'space-between',
            padding: '20px 70px',
            width:'800px'
            }}>
 <h1>{league?.[0]?.league}</h1>
<button className='buttoncard'
 onClick={() => { CopyToClipBoard(leagueId,'League ID')}}>Invite friends</button>
        </div>
        
          <div className='settingsdiv'
           style={{
           width: '800px',marginLeft: '61px',marginTop:'0px'}}>
                <div className='purplediv'>
  <p className='pneon'>{league?.[0].owner}'s league</p>
  <p className='pneon'> created {league&& moment(league[0].createdAt).fromNow()}</p>
  </div>
  <table>
    <tr className='playerdiv'>
    <th>Player name</th>
    <th>Points</th>
    <th>Remainig budget</th>
    </tr>
    {
league&&
league[0].playerss?.map((i)=>{
  return(
<>
<tr className="playerdiv">
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
<Footer/>
</>

  )
}

export default Viewleague