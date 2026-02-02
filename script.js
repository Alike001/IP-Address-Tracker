const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");

const ipValue = document.querySelector(".js-ip");
const locationText = document.querySelector(".js-location");
const timeZone = document.querySelector(".js-timezone");
const isp = document.querySelector(".js-isp");

const apiKey = "at_z9rcmZah8qjwAXZ4sBlfvIgx3TCBo";

const map = L.map("map").setView([0, 0], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker([0, 0]).addTo(map)
    .bindPopup("You are here");

async function getIPData(ip = "") {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;

  const response = await fetch(url);
  const data = await response.json();

  updateData(data);
}

function updateData(data) {
  ipValue.innerHTML = data.ip;
  locationText.innerHTML = `${data.location.city}, ${data.location.country}`;
  timeZone.innerHTML = "UTC" + data.location.timezone
  isp.innerHTML = data.isp;

  const { lat, lng} = data.location;

  map.setView([lat, lng], 13);
  marker.setLatLng([lat, lng]);
}

button.addEventListener("click", () => {
  const digits = input.value.trim();
  getIPData(digits);
});

getIPData();

