const currentTemp = document.querySelector("#current-temp");
const icon = document.querySelector("#weather-icon");
const caption = document.querySelector("figcaption");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.63&appid=8fcf80652c8234bc0e1feb668587138f&units=metric"

async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }    
}

apiFetch(url);

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  icon.setAttribute('src', iconsrc);
  icon.setAttribute('alt', desc);
  caption.textContent = desc;
}

