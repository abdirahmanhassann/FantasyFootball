import React from 'react'
import '../App.css'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'
import leagueshirt from '../images/leaguesshirts.png';
import leaguepic from '../images/leagues.png'
import Footer from './Reusable/Footer.tsx';
function SignedInHome() {
  return (
    <div className='containerdiv'>
        <Navbar/>
        <Subnav page={'home'} />
<div className='rowdiv3' style={{marginTop:'10px'}}>
    <div className='card'>
        <img src={leagueshirt} className='leaguepic'></img>
        <div className='cardtext'>
            <h3>Pick Your Squad</h3>
            <p>Use your budget of £100m to pick a squad of 15 players from the Premier League.</p>
        </div>
    </div>
    <div className='card'>
        <img src={leaguepic} className='leaguepic' style={{ marginTop: '-30px'}}></img>
        <div className='cardtext'>
            <h3>Create and Join Leagues</h3>
            <p>Play against friends and family, colleagues or a web community in invitational leagues and cups.</p>
        </div>
    </div>
        </div>
    <div className='subnav3' style={{marginTop:'30px'}}>
            <div className='rowdiv' style={{gap:'50px',alignItems:'center'}}>
                <div className='columndiv' style={{ width: '60%', alignItems: 'self-start'}}>
            <h3 className='h3neon'>Invite friends to Play Fantasy Premier League</h3>
<p>With over 9 million players, Fantasy Premier League is the biggest Fantasy Football game in the world. It’s FREE to play and you can win great prizes!
</p>              </div>
<button className='buttonneon'onClick={() => {
    navigator.clipboard.writeText('abdirahman.com')
alert('Link copied to clipboard')
}
}
>Share with friends</button>

            </div>

</div>
<Footer/>
    </div>
  )
}

export default SignedInHome;