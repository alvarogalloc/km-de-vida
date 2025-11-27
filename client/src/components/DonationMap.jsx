import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const DonationMap = ({ donations }) => {
    const [markers, setMarkers] = useState([]);
    const center = [20.6597, -103.3496]; // GDL

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (donations.length > 0) {
            setLoading(true);
            setProgress(0);
            const newMarkers = [];
            let processedCount = 0;

            const geocodeAddress = async (donation) => {
                if (!donation.address) return;

                const cacheKey = `geo_nom_${donation.address}`;
                const cached = localStorage.getItem(cacheKey);

                if (cached) {
                    newMarkers.push({ ...donation, position: JSON.parse(cached) });
                    return;
                }

                try {
                    // Nominatim API (OpenStreetMap)
                    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(donation.address)}`);
                    if (!response.ok) throw new Error('Network response was not ok');

                    const data = await response.json();

                    if (data && data.length > 0) {
                        const position = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                        localStorage.setItem(cacheKey, JSON.stringify(position));
                        newMarkers.push({ ...donation, position });
                    }
                } catch (error) {
                    console.error("Geocoding error for", donation.address, error);
                }
            };

            const processDonations = async () => {
                for (const donation of donations) {
                    await geocodeAddress(donation);
                    processedCount++;
                    setProgress(Math.round((processedCount / donations.length) * 100));
                    // Respect Nominatim rate limit (1 req/sec recommended)
                    await new Promise(r => setTimeout(r, 1100));
                }
                setMarkers([...newMarkers]);
                setLoading(false);
            };

            processDonations();
        }
    }, [donations]);

    return (
        <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
            {loading && (
                <div className="absolute inset-0 z-[1000] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-primary font-bold">Cargando mapa de donaciones...</p>
                    <p className="text-sm text-text-muted">{progress}% completado</p>
                </div>
            )}
            <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker.position}>
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold text-base">{marker.orgName}</h3>
                                <p className="text-sm m-0">{marker.foodType}</p>
                                <p className="text-xs text-gray-500 m-0">{marker.address}</p>
                                <p className="text-xs font-semibold mt-1 text-secondary">{marker.pickupTime}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default React.memo(DonationMap);
