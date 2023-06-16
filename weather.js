import { config } from 'dotenv';
import axios from 'axios';
import chalk from 'chalk';

config();
const apiKey = process.env.KEY;

const city = process.argv[2];

let units = 'metric';
if (process.argv[3] === 'imperial' || process.argv[3] === 'standard') {
  units = process.argv[3];
}

const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    process.exit(1);
  }
};

const getFormattedTemperature = (temp) => {
  if (units === 'metric') {
    return `${temp}°C`;
  } else if (units === 'imperial') {
    return `${temp}°F`;
  } else {
    return `${temp}°K`;
  }
};

const printCurrentWeather = (data) => {
  const city = data.name;
  const temperature = getFormattedTemperature(data.main.temp);
  const description = data.weather[0].description;

  console.log(chalk.bold('\n☼ ☀ ☁ ☂ ☃ ☄ ☾ ☽ ❄ ☇ ☈ ⊙ ☉ ℃ ℉ ° ❅ ✺ ϟ'));
  console.log(chalk.bold.yellow('\n\t\tRAMI\'S WEATHER APP'));
  console.log(chalk.bold('\n☼ ☀ ☁ ☂ ☃ ☄ ☾ ☽ ❄ ☇ ☈ ⊙ ☉ ℃ ℉ ° ❅ ✺ ϟ\n'));
  console.log(chalk.bold(`It is now ${temperature} in ${city}.`));
  console.log(chalk.bold(`The current weather conditions are: ${description}\n`));
};

const printForecast = (data) => {
  const city = `${data.city.country}-${data.city.name}`;
  console.log(chalk.bold(`\n${city} 5-day weather forecast:\n`));

  const forecastList = data.list;
  let currentDate = '';

  forecastList.forEach((forecast) => {
    const dateTime = forecast.dt_txt;
    const date = dateTime.slice(8, 10);
    const time = dateTime.slice(11, 16);
    const temperature = getFormattedTemperature(forecast.main.temp);
    const description = forecast.weather[0].description;

    if (date !== currentDate) {
      currentDate = date;
      console.log(chalk.bold(`- Date: ${date}/${dateTime.slice(5, 7)}/${dateTime.slice(0, 4)}\n`));
    }

    console.log(`${chalk.bold('Time:')} ${time} | ${chalk.bold('Temp:')} ${temperature} | ${chalk.bold('Weather:')} ${description}\n`);
  });
};

const startWeatherApp = async () => {
  const currentWeatherData = await fetchWeatherData(currentWeatherUrl);
  const forecastData = await fetchWeatherData(forecastUrl);

  printCurrentWeather(currentWeatherData);
  printForecast(forecastData);
};

startWeatherApp();
