import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useEffect } from "react";
import Styles from "./Theatre.module.scss";
import geojson from "./config";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hlbnppaG9uZyIsImEiOiJjbGp2b2h2aGUxOTZpM2Vvam1pa3FsNXk4In0.JK1OvIWLOXaxw-9hI_6rCw";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    var shanghaiBounds = [
      [120.86, 30.0],
      [122.12, 31.86],
    ];
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/chenzihong/clkal6wyq005001rmgj3l2kzc",
      center: [121.47, 31.23],
      maxBounds: shanghaiBounds,
      zoom: 14,
    });
    map.current.fitBounds(shanghaiBounds, {
      padding: 20,
    });

    // Add markers to the map.
    for (const marker of geojson.theatres) {
      // Create a DOM element for each marker.
      const el = document.createElement("div");
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = "marker";
      el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = "100%";

      el.addEventListener("click", () => {
        window.alert(marker.properties.message);
      });

      // Add markers to the map.
      new mapboxgl.Marker({
        element: el,
        rotationAlignment: 'horizon',
      }).setLngLat(marker.geometry.coordinates).addTo(map.current);
    }
  });

  return (
    <>
      <div ref={mapContainer} className={Styles.mapContainer} />
    </>
  );
}

export default Map;
