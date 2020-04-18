const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/5da6041aabee3668bf29c0ea09473798/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = body.currently;
      const chance = data.precipProbability * 100;
      callback(
        undefined,
        body.daily.data[0].summary +
        ` It is currently ${data.temperature} degrees out with a high of ${body.daily.data[0].temperatureMax} and a low of ${body.daily.data[0].temperatureMin}. There is a ${chance}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
