import { config } from 'dotenv';
import axios from 'axios';

config();
const apiKey = process.env.KEY;

const city = process.argv[2];
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

//  api.openweathermap.org/data/2.5/weather?id=524901&appid=YOUR_API_KEY

const response = await axios.get(url);

// console.log(response.data);

// Read through the returned data from your API and display;
// 1 - The city name
// 2 - The current temperature
// 3 - The current weather conditions
// > Hint: You might also like to consider using the [colors.js](https://github.com/Marak/colors.js) library to make your output fabulous 🤩! 
// 4- Your program should be also able to;
// 5- Display a 5-day forecast
// - Allow the user to switch between **metric** and **imperial** measurements

console.log('City: '+ response.data.name);
console.log('Temp: '+response.data.main.temp);
console.log('Weather: '+response.data.weather[0].description);

// 5-day forecast
const url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
const response2 = await axios.get(url2);
// console.log(response2.data);
console.log(`\n${response2.data.city.country}-${response2.data.city.name} 5-day weather forecast:\n\n- Today:`);

for(let i = 0; i < response2.data.list.length; i++) {
    if(response2.data.list[i].dt_txt.includes('00:00:00'))
    console.log(`\n- Day ${response2.data.list[i].dt_txt.slice(0, 10)}:`);

    console.log(response2.data.list[i].dt_txt.slice(11,16));
    console.log(response2.data.list[i].main.temp);
    // console.log(response2.data.list[i].weather[0].main);
    console.log(response2.data.list[i].weather[0].description);
}
