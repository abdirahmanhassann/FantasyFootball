const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config()
const {getDb}=require('../db')

async function test2(req,res,next){
    const db=await getDb()

    const res1 = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/');
    const data = await res1.json();
    const footballers = data.elements.filter(element => element.element_type >= 2 && element.element_type <= 4);
    const player = [];
    
    footballers.forEach((i) => { 
      let players = {
        totalPoints: i.total_points,
        firstname: i.first_name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        surname: i.second_name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        name: i.web_name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        nowcost: i.now_cost,
      };
      player.push(players);
    });

    


    const dbplayers=await db.collection('users').findOne({},{team}).toArray();
    const po = await dbplayers.filter((i) => i.team !== undefined);


console.log(dbplayers)

po.map((i)=>{
let arr=[i?.gk ,i?.rb ,i?.rcb
    ,i?.lcb ,i?.lb ,i?.rcm
    ,i?.cm ,i?.lcm ,i?.rw
    ,i?.st ,i?.lw ]
    player.map((j)=>{
if(i.firstname === j.gk?.player.firstname.normalize("NFD").replace(/[\u0300-\u036f]/g, "") &&  i.surname === j.team?.gk?.player.lastname.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
{

}    
})
})

}

module.exports=test2