const { fetchMyIP, fetchCoordsByIP } = require('./iss');

const ip1 = fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
fetchCoordsByIP ('174.114.14.84', (error, location)=> {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned location:' , location);
});