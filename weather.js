import { config } from 'dotenv';
import axios from 'axios';

config();
const apiKey = process.env.KEY;

const city = process.argv[2];


let units = 'metric';
if(process.argv[3] === 'imperial' || process.argv[3] === 'standard'){
    units = process.argv[3];
}


const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

//  api.openweathermap.org/data/2.5/weather?id=524901&appid=YOUR_API_KEY

const response = await axios.get(url);

// output+=(response.data);

// Read through the returned data from your API and display;
// 1 - The city name
// 2 - The current temperature
// 3 - The current weather conditions
// > Hint: You might also like to consider using the [colors.js](https://github.com/Marak/colors.js) library to make your output fabulous 🤩! 
// 4- Your program should be also able to;
// 5- Display a 5-day forecast
// - Allow the user to switch between **metric** and **imperial** measurements

let output='';


output+=(`
☼ ☀ ☁ ☂ ☃ ☄ ☾ ☽ ❄ ☇ ☈ ⊙ ☉ ℃ ℉ ° ❅ ✺ ϟ
☼ ☀   RAMI'S    WEATHER    APP    ✺ ϟ
☼ ☀ ☁ ☂ ☃ ☄ ☾ ☽ ❄ ☇ ☈ ⊙ ☉ ℃ ℉ ° ❅ ✺ ϟ

It is now ${response.data.main.temp}${(units==='metric'?'°C': units ==='imperial' ? '°F': '°K')} in ${response.data.name}.

The current weather conditions are: ${response.data.weather[0].description}


`
);
output+=('City: '+ response.data.name);
output+=(' | ');
output+=('Temp: '+response.data.main.temp + (units==='metric'?'°C': units ==='imperial' ? '°F': '°K'));
output+=(' | ');
output+=('Weather: '+response.data.weather[0].description);

// 5-day forecast
const url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
const response2 = await axios.get(url2);
// output+=(response2.data);
output+=(`\n\n${response2.data.city.country}-${response2.data.city.name} 5-day weather forecast:\n\n- Today:\n`);

for(let i = 0; i < response2.data.list.length; i++) {
    if(response2.data.list[i].dt_txt.includes('00:00:00'))
    output+=(`\n- Date: ${response2.data.list[i].dt_txt.slice(8, 10)}/${response2.data.list[i].dt_txt.slice(5, 7)}/${response2.data.list[i].dt_txt.slice(0, 4)}:\n`);

    output+=('Time: ',response2.data.list[i].dt_txt.slice(11,16));
output+=(' | ');

    output+=('Temp: '+response2.data.list[i].main.temp + (units==='metric'?'°C': units ==='imperial' ? '°F': '°K'));
output+=(' | ');

    // output+=(response2.data.list[i].main);
    // output+=(response2.data.list[i].weather[0].main);
    output+=('Weather: '+response2.data.list[i].weather[0].description);
    output+=('\n');
}
// output+=(response.data, response2.data);
console.log(output);