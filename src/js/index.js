'strict mode';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const map = L.map('map').setView([42.8782, -8.5448], 12);
const create = document.getElementById("create");
const lista = document.getElementById("points-list");
let mark = {};


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

map.getContainer().addEventListener('click', (event) => {

  if (create.classList.contains("oculto")) {
    create.classList.toggle("oculto")
    mark = map.mouseEventToLatLng(event);
    console.log(mark);
  }
});

create.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.type == "submit" && document.getElementById('nameInput').value!="") {
    console.log("YES");
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${mark.lat}&lon=${mark.lng}&format=json`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const elemento = document.createElement("li");
      elemento.innerText = `${data.address.municipality} (${data.address.city}), ${data.address.country}`;
      L.marker([mark.lat, mark.lng]).addTo(map)
      .bindPopup('')
      .openPopup();
      create.classList.toggle("oculto");
      document.getElementById('nameInput').value="";
    });
  }
  if (event.target.type == "reset") {
    console.log(event.target);
    create.classList.toggle("oculto");
    document.getElementById('nameInput').value="";
  }
})