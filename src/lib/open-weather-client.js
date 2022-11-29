
const axios = require("axios");
var url = require("url");

class OpenWeatherClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "http://api.openweathermap.org/data/2.5/";
    }

    get(endpoint) {
        const URL =
            url.resolve(this.baseURL, endpoint) +
            `&units=metric&appid=${this.apiKey}`;

        return axios
            .get(URL)
            .then(res => res.data)
            .catch(err => Promise.reject(err.response.data.message));
    }

    async getWeather(city, country) {
        let endpoint = `weather?q=${city}`;

        if (country) {
            endpoint += `,${country}`;
        }

        return await this.get(endpoint);
    }
}

module.exports = OpenWeatherClient;
