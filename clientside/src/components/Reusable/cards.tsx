import React from 'react'
import leagueshirt from '../../images/leaguesshirts.png';
import leaguepic from '../../images/leagues.png'

export default function Cards() {
  return (
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
  )
}
