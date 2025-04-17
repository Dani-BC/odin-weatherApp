async function getWeather(city) {
  const apiKey = "YBFG3MDCM4UJWP83J796MXD52"; // Replace with your Visual Crossing key
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    city
  )}?unitGroup=metric&key=${apiKey}&include=days`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    // Extract only address and days
    const { address, days } = data;
    console.log({ address, days });
    return { address, days };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
}

const button = document.getElementById("Search");
button.addEventListener("click", function () {
  searchCity();
});

function searchCity() {
  const city = document.getElementById("City").value;
  console.log(city);
  getWeather(city);
}
