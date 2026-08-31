// Display the date and time for default locations
function displayTime() {
  // Select relevant elements
  let londonCityElement = document.getElementById("london");
  let londonDateElement = londonCityElement.querySelector(".date");
  let londonTimeElement = londonCityElement.querySelector(".time");

  // Get current date and time
  let now = new Date();

  // Define date formatting options
  let dateOptions = {
    timeZone: "Europe/London",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  // Define time formatting options
  let timeOptions = {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  // Format date
  let londonDate = new Intl.DateTimeFormat("en-US", dateOptions).format(now);
  // Display formatted date
  londonDateElement.textContent = londonDate;

  // Format time
  let londonTime = new Intl.DateTimeFormat("en-US", timeOptions).format(now);
  // Split time string into time hour and time period
  let [londonTimeHour, londonTimePeriod] = londonTime.split(" ");
  // Display time hour
  londonTimeElement.textContent = londonTimeHour;
  // Create small element for time period
  let londonTimePeriodElement = document.createElement("small");
  // Set content for small element
  londonTimePeriodElement.textContent = ` ${londonTimePeriod}`;
  // Append small element to main time element
  londonTimeElement.appendChild(londonTimePeriodElement);
}

setInterval(displayTime);
