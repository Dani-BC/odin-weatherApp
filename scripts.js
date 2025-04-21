async function getWeather(city) {
  const apiKey = "YBFG3MDCM4UJWP83J796MXD52";
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    city
  )}?unitGroup=metric&key=${apiKey}&include=days`;
  const addressText = document.getElementById("Adress");
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    // Extract only address and days
    const { address, days } = data;
    console.log({ address, days });
    data.days.forEach((day, index) => {
      if (day && day.tempmax !== undefined) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
      <h3><strong>Date:</strong> ${day.datetime}</h3>
      <p><strong>Max Temp:</strong> ${day.tempmax}°C</p>
      <p><strong>Min Temp:</strong> ${day.tempmin}°C</p>
      <p><strong>Temperature:</strong> ${day.temp}°C</p>
      <p><strong>Precipitation:</strong> ${day.precipprob}%</p>
      <p><strong>Description:</strong> ${day.description}</p>
    `;

        grid.appendChild(card);
      }
    });
    addressText.innerHTML = address;

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
