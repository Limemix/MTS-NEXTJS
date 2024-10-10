// components/MapComponent.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapComponent = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current === null) {
            const customIcon = new L.Icon({
                iconUrl: "https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
            });

            const map = L.map('map').setView([47.9069773, 33.3885217], 17);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            const houseMarker = L.marker([47.9069773, 33.3885217], { icon: customIcon }).addTo(map);
            houseMarker.bindPopup("<b>Місце проведення</b>").openPopup();

            mapRef.current = map;

            map.invalidateSize();
        }
    }, []);

    return <div id="map" style={{ height: '500px' }}></div>;
}

export default MapComponent;
