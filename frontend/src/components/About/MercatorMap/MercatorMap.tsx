"use client";

import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css"; // Ensure styling is loaded

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MercatorMap({ navHeight }: { navHeight: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: navHeight,
        width: "100vw",
        height: `calc(100vh - ${navHeight}px)`,
      }}
    >
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 0, // Center on Prime Meridian
          latitude: 0, // Center on Equator
          zoom: 1, // Zoom out to fit the full world map
          bearing: 0,
          pitch: 0,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        projection="mercator" // Ensures a Mercator projection
      />
    </div>
  );
}
