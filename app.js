const apiId = getApiId().apiId;

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResult(searchbox.value);
    }
}

function getResult(query){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiId}`)
    .then((res) => res.json())
    .then(displayResult)
    .catch(err => alert("City not found!"));
}

function displayResult(weather) {
    // console.log(weather);

    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let today = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(today);

    let icon = document.querySelector(".weather-icon img");
    icon.setAttribute("src",`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let hi_low = document.querySelector(".hi-low");
    hi_low.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}
