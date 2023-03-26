import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { league } from '../redux/redux'
import Footer from './Reusable/Footer.tsx'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'

interface Ileague{
  [0]:{}
    playeer:[];
  league:string,
  _id:string,
  owner:string,
  
}

function Viewleagues() {
  
const [leagues,setleagues]=useState<[]>([])
const jwttoken=useSelector((State:any)=>State.reducer.jwtstatus.jwt)
const dispatch=useDispatch();
const navigate=useNavigate()
useEffect(()=>{
fetch( 'https://fantasyfootballbackend2.onrender.com/loadleagues',{
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
},[])

function clicked(i):void{
console.log(i)
dispatch(league(i._id))
navigate(`/leagues/viewleagues/${i._id}`)
}

  return (
<>
<Navbar/>
        <Subnav page={'leagues'}/>
        <div className='columndiv2'>

          <div className='settingsdiv'
           style={{
           width: '800px',marginLeft: '61px',marginTop:'0px',
           backgroundPosition: '293px center, left top, 0px center',  margin: 'auto'}}>
      <div className='subnav4' >
    <div className='rowdiv' style={{ gap: '15px',alignItems:'center',justifyContent: 'space-around'}}>
    <h1 className='h3neon' style={{fontWeight:'500'}}>Create or join leagues with friends!</h1>
    <button className='buttonneon' style={{boxShadow: '0px 0px 16px 0px #120125'}}
    onClick={()=>navigate('/leagues/createleague') }>Create or join</button>
    
    </div>
</div>

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
    <th>Owner</th>
    <th>Active players</th>
    </tr>
    {
leagues&& 
leagues.map((i:any)=>{
  return(
<>
<tr className="playerdiv" onClick={()=>clicked(i)}>
  <td>{i.league} </td>
  <td style={{width:'30%'}}>{i._id}</td>
  <td>{i.owner} </td>
      <td>{i.players && i.players.length}</td>
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

export default Viewleagues