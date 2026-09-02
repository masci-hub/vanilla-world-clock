// Format date and time for any city
function formatDateTime(timeZone) {
  // Get current date and time
  let now = new Date();

  // Define date formatting options
  let dateOptions = {
    timeZone: timeZone,
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  // Format date
  let date = new Intl.DateTimeFormat("en-US", dateOptions).format(now);

  // Define time formatting options
  let timeOptions = {
    timeZone: timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  // Format time
  let time = new Intl.DateTimeFormat("en-US", timeOptions).format(now);
  // Separate hour from period
  let [timeHour, timePeriod] = time.split(" ");

  return { date, timeHour, timePeriod };
}

// Generate HTML content for any city
function generateCityElement(city, timeZone) {
  // Format date and time for city
  const { date, timeHour, timePeriod } = formatDateTime(timeZone);
  // Costruct HTML content for city element
  let cityElement = `
       <div class="city">
         <div>
           <h2>${city}</h2>
           <div class="date">${date}</div>
         </div>
         <div class="time"data-timezone="${timeZone}">${timeHour} <small>${timePeriod}</small></div>
       </div>
    `;

  return cityElement;
}

// Generate HTML content for default cities
function generateDefaultCityElements() {
  // Initialize empty string
  let defaultCityElements = "";

  // Map city names to their respective time zone strings
  const defaultCities = {
    London: "Europe/London",
    "New York": "America/New_York",
    Sydney: "Australia/Sydney",
  };
  // Loop through default cities
  for (let city in defaultCities) {
    // Extract time zone for default city
    const timeZone = defaultCities[city];
    // Construct HTML content for default cities
    defaultCityElements += generateCityElement(city, timeZone);
  }

  return defaultCityElements;
}

// Display city name, date, and time for all default cities
function displayDefaultCities() {
  // Select container element
  let defaultCitiesContainer = document.getElementById(
    "default-cities-container",
  );
  // Check if container element exists
  if (defaultCitiesContainer) {
    // Display HTML content for default cities
    defaultCitiesContainer.innerHTML = generateDefaultCityElements();
  }
}

// Generate HTML content for selected city
function generateSelectedCityElement(event) {
  // Extract time zone for selected city
  let timeZone = event.target.value;
  // Extract time zone for my location
  if (timeZone === "current") {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  // Extract city name for selected city
  let cityName = timeZone.split("/")[1].replace("_", " ");

  // Costruct HTML content for selected city
  let selectedCityElement = generateCityElement(cityName, timeZone);

  return selectedCityElement;
}

// Display city name, date, and time for selected city
function displaySelectedCity(event) {
  // Select container element
  let selectedCityContainer = document.getElementById(
    "selected-city-container",
  );
  // Display HTML content for selected city
  selectedCityContainer.innerHTML = generateSelectedCityElement(event);
}

function updateDateTime() {
  // Select all city elements
  const cityElements = document.querySelectorAll(".city");
  // Iterate over city elements
  cityElements.forEach((cityElement) => {
    // Select date element
    const dateElement = cityElement.querySelector(".date");
    // Select time element
    const timeElement = cityElement.querySelector(".time");
    // Get time zone
    const timeZone = timeElement.getAttribute("data-timezone");
    // Get updated date and time
    const { date, timeHour, timePeriod } = formatDateTime(timeZone);
    // Update date element
    dateElement.innerHTML = date;
    // Update time element
    timeElement.innerHTML = `${timeHour} <small>${timePeriod}</small>`;
  });
}

// Init page
displayDefaultCities();

// Update date and time every second
setInterval(updateDateTime);

let citySelect = document.getElementById("city-select");
citySelect.addEventListener("change", displaySelectedCity);
