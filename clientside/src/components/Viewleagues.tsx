import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { league } from '../redux/redux'
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
const dispatch=useDispatch();
const navigate=useNavigate()
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

function clicked(i):void{
console.log(i)
dispatch(league(i._id))
navigate(`/leagues/viewleagues/${i._id}`)
}

  return (
<>
<Navbar/>
        <Subnav/>
          <div className='settingsdiv'
           style={{
           width: '800px',marginLeft: '61px',marginTop:'0px',backgroundPosition: '293px center, left top, 0px center'}}>
      
        <div className='playerselection'>
          <h3>Leagues</h3>
          </div>
          <div className='purplediv'>
  <p className='pneon'>Invitational leagues</p>
  </div>
  <table>
    <tr className='playerdiv' style={{
      fontSize: '12px',color: 'gray'}}>

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
<tr className="playerdiv" onClick={()=>clicked(i)}>
  <td>{i.league} </td>
  <td>{i._id}</td>
  <td>33</td>
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