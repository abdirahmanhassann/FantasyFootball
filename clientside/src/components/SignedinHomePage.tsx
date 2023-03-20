import React from 'react'
import '../App.css'
import Navbar from './Reusable/Navbar.tsx'
import Subnav from './Reusable/Subnav.tsx'
import leagueshirt from '../images/leaguesshirts.png';
import leaguepic from '../images/leagues.png'
import Footer from './Reusable/Footer.tsx';
import CopyToClipBoard from './Reusable/CopytoClipBoard.ts';
import Subnav3 from './Reusable/Subnav3.tsx';
import Cards from './Reusable/cards.tsx';
import News from './Reusable/News.tsx';
function SignedInHome() {
  return (
    <div className='containerdiv'>
        <Navbar/>
        <Subnav page={'home'} />
<Cards/>
<News/>
   <Subnav3/>
<Footer/>
    </div>
  )
}

export default SignedInHome;