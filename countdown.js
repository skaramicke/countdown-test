const events = [
  // This will be populated by the build script
];

function updateCountdown() {
  const now = new Date();
  events.forEach(event => {
    const target = new Date(event.date);
    let delta = Math.floor((target - now) / 1000);

    let years = Math.floor(delta / 31536000);
    delta -= years * 31536000;

    let months = Math.floor(delta / 2592000);
    delta -= months * 2592000;

    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    let minutes = Math.floor(delta / 60) % 60;

    let timeString = '';
    if (years > 0) timeString += `${years}Y `;
    if (months > 0) timeString += `${months}M `;
    if (days > 0) timeString += `${days}D `;
    if (hours > 0) timeString += `${hours}H `;
    if (minutes > 0) timeString += `${minutes}M `;

    document.getElementById(event.title).innerHTML = timeString;
  });
}

setInterval(updateCountdown, 1000);
