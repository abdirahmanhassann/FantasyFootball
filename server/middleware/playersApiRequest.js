const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config()

async function playersApiRequest (req, res,next) {
    const playerArr = [];
  
    for (let i = 1; i <= 3; i++) {
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
        }, 2000);
      });
    }
    req.playerArr = playerArr; 
        next()
  };
  
  module.exports=playersApiRequest