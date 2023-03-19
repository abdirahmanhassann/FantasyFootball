import React from 'react'
import CopytoClipboard from './CopytoClipBoard.ts'
export default function Subnav3() {
  return (
    <div className='subnav3' style={{marginTop:'30px'}}>
            <div className='rowdiv' style={{gap:'50px',alignItems:'center'}}>
                <div className='columndiv' style={{ width: '60%', alignItems: 'self-start'}}>
            <h3 className='h3neon'>Invite friends to Play Fantasy Premier League</h3>
<p>With over 9 million players, Fantasy Premier League is the biggest Fantasy Football game in the world. It’s FREE to play and you can win great prizes!
</p>              </div>
<button className='buttonneon'onClick={() =>CopytoClipboard('www.abdirahman.com','link') }
>Share with friends</button>

            </div>

</div>  )
}
