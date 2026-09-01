// Display the date and time for default locations
function displayDateTime() {
  // Initialize empty string
  let cityElement = "";

  // Get current date and time
  let now = new Date();

  // Map city names to their respective time zone strings
  const cities = {
    London: "Europe/London",
    "New York City": "America/New_York",
    Sydney: "Australia/Sydney",
  };
  // Loop through each city
  for (let city in cities) {
    // Define date formatting options
    let dateOptions = {
      timeZone: cities[city],
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    // Format date
    let date = new Intl.DateTimeFormat("en-US", dateOptions).format(now);

    // Define time formatting options
    let timeOptions = {
      timeZone: cities[city],
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    // Format time
    let time = new Intl.DateTimeFormat("en-US", timeOptions).format(now);
    // Separate hour from period
    let [timeHour, timePeriod] = time.split(" ");

    // Construct HTML content for each city
    cityElement += `
       <div class="city">
         <div>
           <h2>${city}</h2>
           <div class="date">${date}</div>
         </div>
         <div class="time">${timeHour} <small>${timePeriod}</small></div>
       </div>
    `;
  }

  // Select container element
  let cityElementContainer = document.getElementById("city-element-container");
  // Display HTML content for each city
  cityElementContainer.innerHTML = cityElement;
}

setInterval(displayDateTime);
