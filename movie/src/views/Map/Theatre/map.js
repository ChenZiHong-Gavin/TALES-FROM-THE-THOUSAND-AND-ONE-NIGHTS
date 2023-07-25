import { inject, observer } from "mobx-react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useEffect } from "react";
import Styles from "./Theatre.module.scss";
import geojson from "../../../assets/json/geojson.json";
import timeLineData from "../../../assets/json/timeline.json";
import "./map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hlbnppaG9uZyIsImEiOiJjbGp2b2h2aGUxOTZpM2Vvam1pa3FsNXk4In0.JK1OvIWLOXaxw-9hI_6rCw";

function Map({ theatreStore }) {
  const { toggleModal, setTheatreId } = theatreStore;

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    var shanghaiBounds = [
      [120.86, 30.7],
      [122.12, 31.5],
    ];
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/chenzihong/clkal6wyq005001rmgj3l2kzc",
      center: [121.47, 31.23],
      maxBounds: shanghaiBounds,
      zoom: 8,
    });
    map.current.fitBounds(shanghaiBounds, {
      padding: 20,
    });
    map.current.on("load", () => {
      map.current.addSource("theatres", {
        type: "geojson",
        data: geojson,
        cluster: true,
        clusterMaxZoom: 11,
        clusterRadius: 50,
      });
      // Add the 'clusters' layer
      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "theatres",
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions to implement different circle colors based on point_count
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#a9a38b",
            9,
            "#b09987",
          ],
          // Use step expressions to implement different circle radii based on point_count
          // radius弄大一点，不然点太小了
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            9,
            25,
            15,
            30,
          ],
        },
      });
      // Add the 'cluster-count' layer
      map.current.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "theatres",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });
      // Add the 'unclustered-point' layer
      map.current.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "theatres",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 10,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });
      // inspect a cluster on click
      map.current.on("click", "clusters", (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;
        map.current
          .getSource("theatres")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.current.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25,
      });
      map.current.on("mouseenter", "unclustered-point", (e) => {
        map.current.getCanvas().style.cursor = "pointer";
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        popup.setLngLat(coordinates).setHTML(title).addTo(map.current);
      });
      map.current.on("mouseleave", "unclustered-point", () => {
        map.current.getCanvas().style.cursor = "";
        popup.remove();
      });
      map.current.on("click", "unclustered-point", (e) => {
        const id = e.features[0].properties.id;
        setTheatreId(id);
        toggleModal(true);
      });
      map.current.on("mouseenter", "clusters", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });
      map.current.on("mouseleave", "clusters", () => {
        map.current.getCanvas().style.cursor = "";
      });
      const size = 200;
      // This implements `StyleImageInterface`
      // to draw a pulsing dot icon on the map.
      const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: function () {
          const canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext("2d");
        },

        // Call once before every frame where the icon will be used.
        render: function () {
          const duration = 1000;
          const t = (performance.now() % duration) / duration;

          const radius = (size / 2) * 0.3;
          const outerRadius = (size / 2) * 0.7 * t + radius;
          const context = this.context;

          // Draw the outer circle.
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
          context.fill();

          // Draw the inner circle.
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = "rgba(255, 100, 100, 1)";
          context.strokeStyle = "white";
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          // Update this image's data with data from the canvas.
          this.data = context.getImageData(0, 0, this.width, this.height).data;

          // Continuously repaint the map, resulting
          // in the smooth animation of the dot.
          map.current.triggerRepaint();

          // Return `true` to let the map know that the image was updated.
          return true;
        },
      };
      map.current.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

      map.current.on("zoom", () => {
        if (map.current.getZoom() < 11) {
          map.current.setLayoutProperty("point", "visibility", "none");
        }
        if (map.current.getZoom() >= 11) {
          map.current.setLayoutProperty("point", "visibility", "visible");
        }
      });


    });

    return () => {
      toggleModal(false);
    };
  });

  /**
   * 重写history的pushState和replaceState
   * @param action pushState|replaceState
   * @return {function(): *}
   */
  function wrapState(action) {
    // 获取原始定义
    let raw = window.history[action];
    return function () {
      // 经过包装的pushState或replaceState
      let wrapper = raw.apply(this, arguments);

      // 定义名为action的事件
      let e = new Event(action);

      // 将调用pushState或replaceState时的参数作为stateInfo属性放到事件参数event上
      e.stateInfo = { ...arguments };
      // 调用pushState或replaceState时触发该事件
      window.dispatchEvent(e);
      return wrapper;
    };
  }

  function flyTo(e) {
    if (!map.current) return;

    if (map.current.getLayer("point")) {
      map.current.removeLayer("point");
      map.current.removeSource("point");
    }

    const stateInfo = e.stateInfo;
    const eventId = stateInfo[2].split("-")[1];
    if (isNaN(eventId)) return;
    const group = timeLineData["events"][eventId - 1]["theatreId"];
    map.current.flyTo({
      center: geojson.features[group - 1].geometry.coordinates,
      zoom: 15,
    });

    // map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    // 在这个coordinates上添加一个pulsing-dot
    map.current.addSource("point", {
      type: "geojson",
      data: geojson.features[group - 1],
    });

    map.current.addLayer({
      id: "point",
      type: "symbol",
      source: "point",
      layout: {
        "icon-image": "pulsing-dot",
      },
    });
  }

  useEffect(() => {
    const oldPushState = window.history.pushState;
    window.history.replaceState = wrapState("replaceState");
    window.addEventListener("replaceState", flyTo);

    return () => {
      window.removeEventListener("replaceState", flyTo);
      window.history.replaceState = oldPushState;
    };
  }, []);

  return (
    <>
      <div ref={mapContainer} className={Styles.mapContainer} />
    </>
  );
}

export default inject("theatreStore")(observer(Map));
