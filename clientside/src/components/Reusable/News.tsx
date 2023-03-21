import moment from 'moment'
import React, { useEffect, useState } from 'react'

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
const [news,setnews]=useState<Inews |undefined>()
const randomNumber = Math.floor(Math.random() * 11);
    useEffect(()=>{
        fetch('http://localhost:5002/news')
        .then(res=>res.json())
        .then(res=>{
            console.log(res.res)
            setnews(res.res)
        })
    },[])
    
function clicked(){
    window.open(news && news.articles[randomNumber].source.url)
}
  return (
<>
<div className='newscard' onClick={clicked}>
    <div className='containerdiv2'>
<img className='newsimage' src={news?.articles[randomNumber].image && news.articles[randomNumber].image}/>
    </div>
<div className='columndiv' style={{
    gap: '28px',padding: '20px 20px', width: '60%',
    textAlign: 'start'}}>
<h1>{news && news.articles[randomNumber].title.slice(0,60)}...</h1>
<div className='columndiv'>
<p className='lightp'>{news && news.articles[randomNumber].description}</p>
<p className='bolp'>{news &&moment(news.articles[randomNumber].publishedAt).fromNow()}</p>
</div>
</div>
</div>
</>
    )
}

export default News