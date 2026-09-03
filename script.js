// Format date and time for any city
function formatDateTime(timeZone) {
  // Get current date and time
  const now = new Date();

  // Define date formatting options
  const dateOptions = {
    timeZone: timeZone,
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  // Format date
  const date = new Intl.DateTimeFormat("en-US", dateOptions).format(now);

  // Define time formatting options
  const timeOptions = {
    timeZone: timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  // Format time
  const time = new Intl.DateTimeFormat("en-US", timeOptions).format(now);
  // Separate hour from period
  const [timeHour, timePeriod] = time.split(" ");

  return { date, timeHour, timePeriod };
}

// Generate HTML content for any city
function generateCityElement(cityName, timeZone) {
  // Format date and time for city
  const { date, timeHour, timePeriod } = formatDateTime(timeZone);
  // Costruct HTML content for city element
  const cityElement = `
       <div class="city">
         <div>
           <h2>${cityName}</h2>
           <div class="date">${date}</div>
         </div>
         <div class="time" data-timezone=${timeZone}>${timeHour} <small>${timePeriod}</small></div>
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
  for (let cityName in defaultCities) {
    // Extract time zone for default city
    const timeZone = defaultCities[cityName];
    // Construct HTML content for default cities
    defaultCityElements += generateCityElement(cityName, timeZone);
  }

  return defaultCityElements;
}

// Display default cities on the page
function displayDefaultCities() {
  // Select container element
  const defaultCitiesContainer = document.getElementById(
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
  if (timeZone === "current-location") {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  // Extract city name for selected city
  const cityName = timeZone.split("/")[1].replace("_", " ");

  // Costruct HTML content for selected city
  const selectedCityElement = generateCityElement(cityName, timeZone);

  return selectedCityElement;
}

// Display selected city on the page
function displaySelectedCity(event) {
  // Select container element
  const selectedCityContainer = document.getElementById(
    "selected-city-container",
  );
  // Display HTML content for selected city
  selectedCityContainer.innerHTML = generateSelectedCityElement(event);
  // Reset select to first option
  event.target.selectedIndex = 0;
}

// Update date and time for all displayed cities
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

// Initialize page
displayDefaultCities();

// Add event listener to city select
const citySelect = document.getElementById("city-select");
citySelect.addEventListener("change", displaySelectedCity);

// Update date and time every second
setInterval(updateDateTime);
