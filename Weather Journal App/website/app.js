// Open Weather Map API Coordinates by zip/post code
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=897a6d935a8794270337a3b612dcffea&units=imperial";
const myServer = "http://localhost:8000";

/* Global Variables */
let zipCode;
let userFeeling;
const btn = document.getElementById("generate");

console.log();

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

/*
// Debugging 
console.log(`${baseURL}${zipCode}${apiKey}`);
*/
/////////////////////////////////////////////////
btn.addEventListener("click", performAction);

function performAction(e) {
  zipCode = document.getElementById("zip").value;
  userFeeling = document.getElementById("feelings").value;
  /*
  // Debugging 
  console.log(zipCode);
  */
  if (zipCode === "") {
    alert("Please enter valid zip code");
  }
  getWeather(zipCode).then((data) => {
    // Structuring the recieved data
    const { temp } = data.main;
    const info = { newDate, temp, userFeeling };
    // POST request to server.js with incoming data
    postData(`${myServer}/add`, info);
    // calling updateUI function
    updateUI();
  });
}

// Function 1
// Retrieval of the weather data
const getWeather = async (zipCode) => {
  const res = await fetch(`${baseURL}${zipCode}${apiKey}`);
  try {
    const data = await res.json();
    console.log(data);
    if (data.cod === "404") {
      alert(data.message);
    }
    return data;
  } catch (error) {
    // Error Handling
    alert(error);
  }
};

// Function 2
// POST request to add the API data
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.error(error);
  }
};

// Function 3
// Updating UI by getting data from GET request
const updateUI = async () => {
  const res = await fetch(`${myServer}/all`);
  try {
    const recentData = await res.json();
    console.log(recentData);
    document.getElementById("temp").innerHTML =
      Math.round(recentData.temp) + " degrees";
    document.getElementById("date").innerHTML = recentData.newDate;
    document.getElementById("content").innerHTML = recentData.userFeeling;
  } catch (error) {
    console.error(error);
  }
};
