//------------------add time ---------------------------------------
const setDate = document.querySelector(".date #date");
const setTime = document.getElementById("time");
var getTime = new Date();
function checktime(i) {
  if (i < 10) {
    i = "0" + i;
    return i;
  } else {
    return i;
  }
}
function date() {
  let dayofweek = getTime.getDay();
  const dayname = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = getTime.getDate();
  date = checktime(date);
  let month = getTime.getMonth() + 1;
  month = checktime(month);
  let year = getTime.getFullYear();
  setDate.innerHTML =
    dayname[dayofweek] + ", " + date + "/" + month + "/" + year;
}
date();

function time() {
  let h = getTime.getHours();
  h = checktime(h);
  let m = getTime.getMinutes();
  m = checktime(m);
  let s = getTime.getSeconds();
  s = checktime(s);
  setTime.innerHTML = h + ":" + m + ":" + s;
}

//--------------------call api -----------------------------------
const locate = document.querySelector(".locate");
const country = document.querySelector(".country");
const temper = document.querySelector(".temper");
const cloud = document.querySelector(".cloud h3");
const number_tempmax = document.querySelector(".number_tempmax");
const number_tempmin = document.querySelector(".number_tempmin");
const number_visibility = document.querySelector(".number_visibility");
const number_wind = document.querySelector(".number_wind");
const number_humid = document.querySelector(".number_humid");
const number_feellike = document.querySelector(".number_feellike");
const number_pressure = document.querySelector(".number_pressure");
const number_sunrise = document.querySelector(".number_sunrise");
const search = document.querySelector(".fa-search");
const inputSearch = document.querySelector(".inputSearch");
const content = document.querySelector(".content");
const alert = document.querySelector(".alert");
const container = document.querySelector(".container");
const body = document.querySelector("body");
//${locationSearch}
function dataWeather(locationSearch) {
  let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${locationSearch}&appid=84f4c4249e6ace08c0bc529808e9f152`;
  fetch(urlAPI)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (locationSearch == " ") {
        alert("You don't enter input!");
      } else {
        if (data.cod == 200) {
          content.classList.remove("hideContent");
          container.classList.remove("containerAppear");
          locate.innerText = data.name + ", ";
          country.innerText = data.sys.country;
          let getTemp = Math.ceil(data.main.temp - 273.15);
          temper.innerText = getTemp  + " °C";
          cloud.innerText = data.weather[0] ? data.weather[0].description : "";
          number_tempmax.innerText =  Math.ceil(data.main.temp_max - 273.15)+ " °C";
          number_tempmin.innerText =  Math.ceil(data.main.temp_min - 273.15)+ " °C";
          number_visibility.innerText = data.visibility;
          number_wind.innerText = data.wind.speed + "m/s";
          number_humid.innerText = data.main.humidity + "%";
          number_feellike.innerText =  Math.ceil(data.main.feels_like - 273.15)+ " °C";
          number_pressure.innerText = data.main.pressure + "hPa";
          //number_sunrise.innerText = data.sys.sunrise;

          if (getTemp < 10) {
            container.setAttribute('class', 'dong');
          }
          if (getTemp > 10 && getTemp <= 20) {
            container.setAttribute('class', 'spring');
          }
          if (getTemp > 20 && getTemp <= 30) {
            container.setAttribute('class', 'autum');
          }
          if (getTemp > 30) {
            container.setAttribute('class', 'summer');
          }
        } else {
          alert.classList.remove("alert");
          content.classList.add("hideContent");
          container.classList.add("containerAppear");
          //alert.innerText = data.cod + ": " + data.message + "!";
        }
      }
    })
    .catch((err) => {});
}
search.onclick = function () {
  let valueSearch = inputSearch.value;
  dataWeather(valueSearch);
};
setInterval(time(), 1000);
dataWeather("phu tho");
