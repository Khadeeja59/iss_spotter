const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const coords = { latitude: 45.4446, longitude: -75.6385 };
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
fetchCoordsByIP('174.114.14.84', (error, location)=> {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned location:' , location);
});

fetchISSFlyOverTimes( coords, (error, arrPasses)=> {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned flyover times' , arrPasses);
});


