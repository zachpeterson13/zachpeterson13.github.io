// Zach Peterson

// api key for openweathermap api
var key = "42d801e00656cffed67d5997072339a8";
var obj;

// gets whether it is day time or night time based on what city the user searched
let isDayTime = function(timezone) {
  var offset = new Date().getTimezoneOffset() / 60;
  let hours = (new Date().getHours() + timezone + offset) % 24;
  console.log(hours);
  if (hours > 6 && hours < 20) {
    return "day";
  } else {
    return "night";
  }
}

// returns date in this format "Day of week, dd month"
let getDate = function() {
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  let date = new Date();
  let dayOfWeek = days[date.getDay()];
  let month = months[date.getMonth()];
  let dayOfMonth = date.getDate();

  return dayOfWeek + ", " + month + " " + dayOfMonth;
}

// this function creates and assembles an article and displays it
let output = function(obj) {
  // storing the pieces of the obj that i want
  // let _dayTime = "day"; // uncomment and change to test day/night
  let _dayTime = isDayTime(obj.timezone / 3600);
  let _icon = _dayTime + "-" + obj.weather[0].id;
  let _city = obj.name;
  let _weather = obj.weather[0].main;
  let _temp = Math.round(obj.main.temp);
  let _wind = Math.round(obj.wind.speed);

  // create our html article to append all of our info to
  let article = document.createElement('article');
  article.classList.add("weather-widget");
  article.classList.add(_dayTime + "-gradient");

  // create and setup elemements to append to the article
  // div for css grid
  let div1 = document.createElement('div');
  div1.className = "weather-info";

  //div to append all the weather info too
  let div2 = document.createElement('div');

  // weather info
  // date and city
  let date = document.createElement('span');
  date.innerText = getDate() + " | " + _city;
  date.className = "date";

  // horizonal rule
  let rule1 = document.createElement('hr');
  rule1.className = "rule";

  // the temperature
  let temp = document.createElement('span');
  temp.innerText = _temp + "°F";
  temp.className = "temp";

  // weather description (cloudy, clear, rainy, etc.)
  let weatherDesc = document.createElement('span');
  weatherDesc.innerText = _weather;
  weatherDesc.className = "weatherDesc";

  // horizonal rule
  let rule2 = document.createElement('hr');
  rule2.className = "rule";

  // wind speed
  let wind = document.createElement('span');
  wind.innerHTML = "<i class=\"wi wi-strong-wind\"></i>" + _wind + " mph";
  wind.className = "wind";

  // append all the weather info to the this div (might be unnecessary, but i am scared to change things)
  div2.appendChild(date);
  div2.appendChild(rule1);
  div2.appendChild(temp);
  div2.appendChild(weatherDesc);
  div2.appendChild(rule2);
  div2.appendChild(wind);

  // append the weather info container to the grid div
  div1.appendChild(div2);

  // icon div
  let iconDiv = document.createElement('div');
  iconDiv.className = "icon-container";
  
  // create icon
  let icon = document.createElement('i');
  icon.classList.add("wi");
  icon.classList.add("wi-owm-" + _icon);
  icon.classList.add("icon-" + _dayTime);

  // append the icon to the iconDiv
  iconDiv.appendChild(icon);

  // append both div and iconDiv to the article
  article.appendChild(div1);
  article.appendChild(iconDiv);

  // append the article to the #weather div
  document.querySelector('#weather').appendChild(article);
}

// resets the weather div
let reset = function() {
  document.querySelector('#weather').innerHTML = "";
}

// handles what happens when submit button is pressed
let submitHandler = function() {
  reset();

  let city = document.querySelector('#name').value;

  fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=" + key)
  .then(r => r.json())
  .then((data) => {
    obj = data;
    
    output(obj);
  });
}

// add click listener to submit button
var submit = document.querySelector('#submit');
submit.addEventListener("click", submitHandler)