const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();
const {getDb}=require('../db');

async function updateRating (req,res,next) {
  const playerArr = [];
  for (let i = 1; i <= 7; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        fetch(`https://v3.football.api-sports.io/players?league=39&season=2022&page=${i}`, {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key':process.env.API_KEY3
          }
        })
        .then((response) => response.json())
        .then((data) => {
          playerArr.push(data);
          console.log(data);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          resolve();
        });
      }, 1000);
    });
  }

  const player=[]
  const combined=[]

  const res1 = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/');
  const data = await res1.json();
  const footballers = data.elements.filter(element => element.element_type >= 2 && element.element_type <= 4);
  footballers.forEach((i) => { 
    let players={
      totalPoints:i.total_points,
      averagePoints:i.points_per_game,
      firstname:i.first_name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      surname:i.second_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }
    player.push(players)
  });

  
  await Promise.all(playerArr.map(async (i) => {
    await Promise.all(i.response.map(async (k) => {
      await Promise.all(player.map(async (j) => {
        if (j.firstname===k.player.firstname.normalize("NFD").replace(/[\u0300-\u036f]/g, "") && j.surname===k.player.lastname.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
            k={
            ...k,
            totalPoints:j.totalPoints,
            averagePoints:j.averagePoints
          }   
          combined.push(k)
        }
    }));
}));
}));
res.send(combined)
}

module.exports = updateRating;
