
const OpenWeatherClient = require("./open-weather-client");

const API_KEY = "7f94570bb1111b7cb2aa5ae6a4fdccda";

function formatWeatherData(data) {
    const summary = `It is now ${data.main.temp}\u00B0C in ${data.name}, ${data.sys.country}`;

    const conditions = `The current weather conditions are: ${data.weather
        .map(condtion => condtion.description)
        .join(", ")}`;

    return summary + "\n" + conditions;
}

module.exports = async function weather(city, country) {
    const client = new OpenWeatherClient(API_KEY);
    const currentData = await client.getWeather(city, country);

    return formatWeatherData(currentData);
};
