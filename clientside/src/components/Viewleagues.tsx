import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Footer from './Reusable/Footer.tsx'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'

interface Ileague{
  league:string;
  _id:string;
  owner:string;
  players:[]
}

function Viewleagues() {
  
const [leagues,setleagues]=useState<Ileague[]>([])
const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt)
useEffect(()=>{
fetch('http://localhost:5002/loadleagues',{
method:'GET',
headers:{
  'Content-Type':'application/json',
  Authorization:`Bearer ${jwttoken}`
}}
)
.then(res=>res.json())
.then(res=>setleagues(res))
},[])
  return (
<>
<Navbar/>
        <Subnav/>
          <div className='settingsdiv'
           style={{marginLeft: '61px',marginTop:'0px',backgroundPosition: '293px center, left top, 0px center'}}>
      
        <div className='playerselection'>
          <h3>Leagues</h3>
          </div>
          <div className='purplediv'>
  <p className='pneon'>Invitational leagues</p>
  </div>
  <table>
    <tr className='playerdiv'>

    <th>League name</th>
    <th>League ID</th>
    <th>Current rank</th>
    <th>Active players</th>
    </tr>
    {
leagues&& 
leagues.map((i)=>{
  return(
<>
<tr className="playerdiv">
  <td>{i.league} </td>
  <td>{i._id}</td>
  <td>55</td>
  <td>{i.players && i.players.length}</td>
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

export default Viewleagues