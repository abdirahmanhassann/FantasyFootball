import { CSpinner } from '@coreui/react';
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import env from "react-dotenv";
import ScaleLoader from "react-spinners/ClipLoader";


interface Inews{
    articles:
        [{
             image:string
            ,content:string
              ,description:string,
                title:string,
                publishedAt:string,
                source:{

                     name:string,
                        url:string
        }
        }]

}

function News() {
const [news,setnews]=useState<Inews | undefined>()
const randomNumber = Math.floor(Math.random() * 11);
    useEffect(()=>{
        fetch('https://fantasyfootballbackend2.onrender.com/news')
        .then(res=>res.json())
        .then(res=>{
            console.log(res.res)
            setnews(res.res.news)
        })
    },[])

function clicked(){
    window.open(news && news.articles[randomNumber].source.url)
}
  return (
<>
<div className='newscard' onClick={clicked}>
    <div className='containerdiv2'>
        {
news &&
<img className='newsimage' src={news?.articles[randomNumber]?.image && news.articles[randomNumber].image}/>
        }
    </div>
<div className='columndiv' style={{
    gap: '10px',padding: '20px 20px', width: '60%',
    textAlign: 'start'}}>
           {
!news &&
 <ScaleLoader
 size={150}
 margin-left={'500px'}
 color={'#2557a7'}
/>
}
<h1>{news && news?.articles[randomNumber]?.title?.slice(0,70)}...</h1>
<div className='columndiv' style={{alignItems:'start'}}>
<p className='lightp'>{news && news?.articles[randomNumber]?.description}</p>
<p className='lightp' style={{alignSelf: 'self-start'}}>{news &&moment(news?.articles[randomNumber]?.publishedAt).fromNow()}</p>
</div>
</div>
</div>
</>
    )
}

export default News