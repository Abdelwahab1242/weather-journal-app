/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const openWeatherKey = "f34a6933bebd13e0c9a762e555ffd415";
const openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e) {
  const input = document.getElementById("feelings").value;
  const zip = document.getElementById("zip").value;
  if (zip === "" || zip === null) {
    alert("Please enter a valid zip code");
  }
  getForecast(zip)
    .then(jsonResponse => {
      postData("/add", {
        temp: jsonResponse.main.temp,
        date: newDate,
        input: input
      });
    })
    .then(renderUI);
}

/* Function to GET Web API Data*/
const getForecast = async zipCode => {
  const response = await fetch(
    `${openWeatherUrl}${zipCode},us&appid=${openWeatherKey}`
  );
  try {
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to Render The Weather Data */
const renderUI = async () => {
  const request = await fetch("/all");
  try {
    const serverData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${
      serverData[serverData.length - 1].date
    }`;
    document.getElementById("temp").innerHTML = `Temperature: ${
      serverData[serverData.length - 1].temp
    }`;
    document.getElementById("content").innerHTML = `Content: ${
      serverData[serverData.length - 1].input
    }`;
  } catch (error) {
    console.log("error", error);
  }
};
