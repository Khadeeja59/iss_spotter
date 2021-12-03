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


module.exports = { fetchMyIP, fetchCoordsByIP};
