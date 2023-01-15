// Open Weather Map API Coordinates by zip/post code
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=897a6d935a8794270337a3b612dcffea&units=imperial";
const myServer = "http://localhost:8000";

/* Global Variables */
const zipCode = document.getElementById("zip").value;

// Test
console.log(zipCode);
console.log(`${baseURL}${zipCode}${apiKey}`);

const userFeeling = document.getElementById("feelings").value;
const btn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

/*
console.log(`${baseURL}${zipCode}${apiKey}`);
*/
/////////////////////////////////////////////////
btn.addEventListener("click", performAction);

function performAction(e) {
  getWeather(zipCode).then((data) => {
    if (data) {
      const {
        main: { temp },
      } = data;
      const info = [newDate, Math.round(temp)];
      postData(`${myServer}/add`, info);
      // calling updateUI function
      updateUI();
    }
  });
}

// Function 1
// Retrieval of the weather data,
const getWeather = async (zipCode) => {
  const res = await fetch(`${baseURL}${zipCode}${apiKey}`);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    // Error Handling
    console.error(error);
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
// Updating UI
const updateUI = async () => {
  const res = await fetch(`${myServer}/all`);
  try {
    const recentData = await res.json();
    document.getElementById("temp").innerHTML =
      Math.round(recentData.temp) + "degrees";
    document.getElementById("date").innerHTML = recentData.newDate;
    document.getElementById("content").innerHTML = recentData.userFeeling;
  } catch (error) {
    console.error(error);
  }
};
