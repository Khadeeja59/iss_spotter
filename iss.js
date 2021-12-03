const request = require('request');
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error){
       return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback){
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error){
       return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    
     let latitude = JSON.parse(body).latitude;
     let longitude = JSON.parse(body).longitude;
    
    return callback(null, {latitude,longitude});
  });
};
const fetchISSFlyOverTimes = function(coords, callback) {

  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error){
       return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISSFlyOverTimes: ${body}`), null);
      return;
    }
    const Passes = JSON.parse(body)
    const arrPasses = JSON.parse(body).response;
    callback(null, arrPasses);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(location, (error, arrPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, arrPasses);
      });
    });
  });
};



//module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};
module.exports = nextISSTimesForMyLocation;