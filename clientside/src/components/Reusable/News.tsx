import moment from 'moment'
import React, { useEffect, useState } from 'react'

interface Inews{
    articles:[
        {
             image:string
            ,content:string
              ,description:string,
                title:string,
                publishedAt:string,
                source:{

                     name:string,
                        url:string
        }
        }
    ]
}

function News() {
const [news,setnews]=useState<Inews>()
    useEffect(()=>{
        fetch('http://localhost:5002/news')
        .then(res=>res.json())
        .then(res=>{
            console.log(res.res)
            setnews(res.res)
        })
    },[])

  return (
<>
<div className='newscard'>
<img src={news && news.articles[0].image} style={{height:'350px'}}></img>
<div className='columndiv' style={{
    gap: '28px',padding: '60px 20px',
    textAlign: 'start'}}>
<h2>{news && news.articles[0].title.slice(0,60)}...</h2>
<div className='columndiv'>
<p className='lightp'>{news && news.articles[0].description}</p>
<p className='bolp'>{news &&moment(news.articles[0].publishedAt).fromNow()}</p>
</div>
</div>
</div>
</>
    )
}

export default News