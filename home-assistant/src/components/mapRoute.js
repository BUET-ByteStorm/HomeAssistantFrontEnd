import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../App.css";
import "leaflet/dist/leaflet.css";
import leaflet from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";


leaflet.Marker.prototype.options.icon = leaflet.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

const Routing = ({ sourceCity, destinationCity }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        if (sourceCity?.lat !== undefined && destinationCity?.lat !== undefined) {
            const routingControl = leaflet.Routing.control({
                waypoints: [
                    leaflet.latLng(parseFloat(sourceCity.lat), parseFloat(sourceCity.lng)),
                    leaflet.latLng(parseFloat(destinationCity.lat), parseFloat(destinationCity.lng))
                ],
                routeWhileDragging: true,
                lineOptions: {
                    styles: [{ color: "#6FA1EC", weight: 4 }]
                },
                show: true,
                showAlternatives: true,
                addWaypoints: true,
                fitSelectedRoutes: true,
            }).addTo(map);
            return () => map.removeControl(routingControl);
        }
    }, [map, sourceCity, destinationCity]);

    return null;
}


export default function MapRoute({sourceCity,destinationCity}) {
    console.log(sourceCity);
    console.log(destinationCity);
    const position = [(sourceCity.lat+destinationCity.lat)/2.0, (sourceCity.lng+destinationCity.lng)/2.0];

  return (
    <div className="leaflet-container">
    <MapContainer style={{height:"1000px"}} scrollWheelZoom={false} center={position} zoom={6} >    
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <Routing sourceCity={sourceCity} destinationCity={destinationCity}/>        
        {/* <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker> */}
    </MapContainer>
    </div>
  );
}