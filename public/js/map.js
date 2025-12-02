const DEFAULT_CENTER = [20.6597, -103.3496]; // Guadalajara center
const map = L.map('map').setView(DEFAULT_CENTER, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// UI elements
const infoBox = document.getElementById('info');
const distEl = document.getElementById('distance');
const durEl = document.getElementById('duration');
const etaEl = document.getElementById('eta');

// Geocoder
const geocoder = L.Control.geocoder({
  placeholder: 'Search for an address...',
  defaultMarkGeocode: false
}).addTo(map);

geocoder.on('markgeocode', function (e) {
  const center = e.geocode.center;
  document.getElementById('address').value = e.geocode.name || '';
  setDestination(center.lat, center.lng);
  drawRouteTo(center.lat, center.lng);
});

// Button search
document.getElementById('goBtn').addEventListener('click', () => {
  const q = document.getElementById('address').value;
  if (!q) return alert('Please enter an address.');

  geocoder.options.geocoder.geocode(q + ", Guadalajara", (results) => {
    if (!results || results.length === 0) return alert('Address not found.');
    const r = results[0];
    setDestination(r.center.lat, r.center.lng);
    drawRouteTo(r.center.lat, r.center.lng);
  });
});

// Map icons
const donorIcon = L.divIcon({ html: '🥫', className: 'donor-icon', iconSize: [50, 50] });
const receiverIcon = L.divIcon({ html: '📦', className: 'receiver-icon', iconSize: [50, 50] });
const driverIcon = L.divIcon({ html: '🚚', className: 'driver-icon', iconSize: [50, 50] });

let donorMarkers = [];
let receiverMarkers = [];
let userMarker = null;
let destMarker = null;
let driverMarker = null;
let routeLine = null;
let watchId = null;

async function loadPlaces() {
  try {
    const [dRes, rRes] = await Promise.all([
      fetch('/data/donors.json'),
      fetch('/data/receivers.json')
    ]);

    const donors = await dRes.json();
    const receivers = await rRes.json();

    donors.forEach(d => {
      const m = L.marker([d.lat, d.lon], { icon: donorIcon })
        .bindPopup(`<b>${d.name}</b><br>${d.address || ''}`);
      m.addTo(map);
      donorMarkers.push(m);
    });

    receivers.forEach(r => {
      const m = L.marker([r.lat, r.lon], { icon: receiverIcon })
        .bindPopup(`<b>${r.name}</b><br>${r.address || ''}`);
      m.addTo(map);
      receiverMarkers.push(m);
    });

  } catch (err) {
    console.warn('Failed to load donors/receivers:', err);
  }
}
loadPlaces();

function setUserLocation(lat, lon) {
  const coords = [lat, lon];
  if (!userMarker) {
    userMarker = L.marker(coords)
      .addTo(map)
      .bindPopup('You are here')
      .openPopup();
  } else {
    userMarker.setLatLng(coords);
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (p) => {
      setUserLocation(p.coords.latitude, p.coords.longitude);
      map.setView([p.coords.latitude, p.coords.longitude], 14);
    },
    (err) => { console.warn('Geolocation error:', err); }
  );
}

function setDestination(lat, lon) {
  if (destMarker) map.removeLayer(destMarker);
  destMarker = L.marker([lat, lon])
    .addTo(map)
    .bindPopup('Destination')
    .openPopup();
}

async function drawRouteTo(destLat, destLon) {
  let startLatLng = DEFAULT_CENTER;
  if (userMarker) startLatLng = userMarker.getLatLng();

  const mode = document.getElementById('mode').value || 'driving';

  const url = `https://router.project-osrm.org/route/v1/${mode}/${startLatLng.lng},${startLatLng.lat};${destLon},${destLat}?overview=full&geometries=geojson&steps=false`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      alert('Route not found.');
      return;
    }

    const route = data.routes[0];
    const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);

    if (routeLine) map.removeLayer(routeLine);
    routeLine = L.polyline(coords, { color: 'blue', weight: 4 }).addTo(map);
    map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });

    const distanceKm = (route.distance / 1000).toFixed(2);
    const durationMin = Math.round(route.duration / 60);
    const etaDate = new Date(Date.now() + route.duration * 1000);

    distEl.textContent = `Distance: ${distanceKm} km`;
    durEl.textContent = `Estimated duration: ${durationMin} min`;
    etaEl.textContent = `Estimated arrival: ${etaDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    infoBox.style.display = 'block';

  } catch (err) {
    console.error('Error calculating route:', err);
    alert('Error calculating route.');
  }
}

document.getElementById('trackBtn').addEventListener('click', () => {
  if (!navigator.geolocation) return alert('Geolocation not supported.');

  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    document.getElementById('trackBtn').textContent = 'Start tracking';
    if (driverMarker) driverMarker.remove();
    return;
  }

  watchId = navigator.geolocation.watchPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    if (!driverMarker) {
      driverMarker = L.marker([lat, lon], { icon: driverIcon })
        .addTo(map)
        .bindPopup('Driver (live)');
    } else {
      driverMarker.setLatLng([lat, lon]);
    }

    document.getElementById('trackBtn').textContent = 'Stop tracking';

  }, err => {
    console.warn('Tracking error:', err);
    alert('Unable to get live location (GPS permission needed).');
  }, { enableHighAccuracy: true, maximumAge: 3000 });

});
