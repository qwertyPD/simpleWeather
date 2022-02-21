"use strict";

const url = '/js/data.json';

async function getData() {
    let resp = await fetch(url);

    if (resp.ok) {
        let json = resp.json();
        return json;
    } else {
        alert('Error: ' + resp.status);
    }
}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
};

function getHoursString(dataTime) {
    let date = new Date(dataTime);
    let hours = date.getHours().pad();
    
    return hours;
}

function render(data) {
    renderCity(data);
    renderTemperature(data);
    renderDescription(data);
    renderForecast(data);
    renderAdditions(data);
}

function renderTemperature(data) {
    let currentTemperature = document.querySelector('.currentTemperature');
    currentTemperature.innerHTML = Math.round(data.list[0].main.temp - 273.15) + '°';
}

function renderCity(data) {
    let cityName = document.querySelector('.city');
    cityName.innerHTML = data.city.name;
}

function renderDescription(data) {
    let description = document.querySelector('.description');
    description.innerHTML = data.list[0].weather[0].description;
}

function renderForecast(data) {
    let forecastsList = document.querySelector('.forecast');
    let forecasts = '';
    
    for (let i = 0; i < 6; i++) {
        let item = data.list[0];

        let temp = Math.round(item.main.temp - 273.15) + '°';
        let hours = (i == 0 ? 'Now' : getHoursString(item.dt * 1000));

        let template = `<div class="forecastItem">
            <div class="time">${hours}</div>
            <div class="icons"></div>
            <div class="temperature">${temp}</div>
        </div>`;
        forecasts += template;
    }
    forecastsList.innerHTML = forecasts;
}

function renderAdditions(data) {
    let item = data.list[0];
    let feels_like = Math.round(item.main.feels_like - 273.15) + '°';
    let wind = item.wind.speed + ' m/s';
    let humidity = item.main.humidity + '%';
    let pressure = Math.round(item.main.pressure / 1.33) + ' mmHg';
    renderAdditionItem('feelslike', feels_like);
    renderAdditionItem('wind', wind);
    renderAdditionItem('humidity', humidity);
    renderAdditionItem('pressure', pressure);
}

function renderAdditionItem(className, value) {
    let container = document.querySelector(`.${className}`).querySelector('.value');
    container.innerHTML = value;
}

function start() {
    getData().then(data => {
        render(data);
    });
}

start();