const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config()
const {getDb}=require('../db')


async function FixturesCheck (req,res,next){
const db=getDb();
// fetch("https://v3.football.api-sports.io/fixtures?next=99&league=39", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "v3.football.api-sports.io",
// 		"x-rapidapi-key": process.env.API_KEY3
// 	}
// })
// .then(res=>res.json())
// .then(response => {
// 	console.log(response);
//  db.collection('fixtures').insertOne({
//     fixture:response
//  })

// })
// .catch(err => {
//     console.log(err);
// });

const dbData=await db.collection('fixtures').findOne({})
timeArr= []

const po=   dbData.fixture.response.forEach((i)=>{
return(
    timeArr.push({date:i.fixture.date,hometeam:i.teams.home.name, awayteam:i.teams.away.name})
)
})

newArr=[]

const timeNowStr = "2023-04-01T8:25:00.579Z";
const timeNow = new Date('2023-04-01T18:00:00.000Z');

// const po=   response.response.map((i)=>{
// return(
//     timeArr.push(i.fixture.date)
// )
// })

for (let eventTime of  timeArr) {
    const eventDate = new Date(eventTime.date);
    console.log(eventDate,timeNow)
    // Adjust for the time zone offset
   // const adjustedEventDate = new Date(eventDate.getTime() + (eventDate.getTimezoneOffset() * 60000));
   // console.log(adjustedEventDate,'adusted')
    // Calculate the time difference in milliseconds
    const timeDiff = eventDate.getTime() - timeNow.getTime();
  const converted=timeDiff
    console.log(timeDiff)
if(timeDiff<=10800000 && timeDiff>=-10800000 ){
newArr.push(eventTime)

}  


}

res.send({timeNow:new Date,res:newArr, actualres:timeArr})

}

module.exports=FixturesCheck;