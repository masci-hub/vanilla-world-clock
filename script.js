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

  // Return formatted date and time
  return { date, timeHour, timePeriod };
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
  // Loop through each city
  for (let city in defaultCities) {
    // Format date and time for default city
    const timeZone = defaultCities[city];
    const { date, timeHour, timePeriod } = formatDateTime(timeZone);
    // Construct HTML content for each city
    defaultCityElements += `
       <div class="city">
         <div>
           <h2>${city}</h2>
           <div class="date">${date}</div>
         </div>
         <div class="time">${timeHour} <small>${timePeriod}</small></div>
       </div>
    `;
  }
  return defaultCityElements;
}

// Display date and time for default locations
function displayDateTime() {
  // Select container element
  let defaultCitiesContainer = document.getElementById(
    "default-cities-container",
  );
  // Check if container element exists
  if (defaultCitiesContainer) {
    // Display HTML content for each city
    defaultCitiesContainer.innerHTML = generateDefaultCityElements();
  }
}

// Update time every second
setInterval(displayDateTime);

// Display date and time for selected city
function updateCity(event) {
  // Extract time zone for selected city
  let timeZone = event.target.value;
  // Extract time zone for my location
  if (timeZone === "current") {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  // Extract city name for selected city
  let cityName = timeZone.split("/")[1].replace("_", " ");
  // Format date and time for selected city
  const { date, timeHour, timePeriod } = formatDateTime(timeZone);

  // Costruct HTML content for selected city
  let selectedCityElement = `
       <div class="city">
         <div>
           <h2>${cityName}</h2>
           <div class="date">${date}</div>
         </div>
         <div class="time">${timeHour} <small>${timePeriod}</small></div>
       </div>
    `;
  // Select container element
  let selectedCityContainer = document.getElementById(
    "selected-city-container",
  );
  // Display HTML content for selected city
  selectedCityContainer.innerHTML = selectedCityElement;
  // Update time every second
  setInterval(() => updateCity(event));
}

let citySelect = document.getElementById("city-select");
citySelect.addEventListener("change", updateCity);
