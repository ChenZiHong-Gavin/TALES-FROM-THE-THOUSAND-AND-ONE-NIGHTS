import Styles from "./Transformer.module.scss";
import { Button } from "antd";
import Element from "./Element";
import TimeSlider from "./Slider";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { useEffect, useRef } from "react";
import table from "./config";

const Transformer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, controls;
    const objects = [];
    const targets = {
      grid: [],
      helix: [],
      table: [],
      sphere: [],
    };

    const init = () => {
      const fieldOfView = 40;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspect = width / height;
      const nearPlane = 1;
      const farPlane = 10000;
      const WebGLoutput = containerRef.current;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspect,
        nearPlane,
        farPlane
      );
      camera.position.z = 3000;

      renderer = new CSS3DRenderer();
      renderer.setSize(width, height);
      renderer.domElement.style.position = "absolute";
      WebGLoutput.appendChild(renderer.domElement);

      controls = new TrackballControls(camera, renderer.domElement);

      controls.rotateSpeed = 1;
      controls.staticMoving = true;
      controls.minDistance = 500;
      controls.maxDistance = 6000;
      controls.addEventListener("change", render);

      const len = table.length;

      for (let i = 0; i < len; i += 5) {
        const element = document.createElement("div");
        element.className = "element";
        element.style.backgroundColor = `rgba(0, 127, 127, ${
          Math.random() * 0.5 + 0.25
        })`;

        const number = document.createElement("div");
        number.className = "number";
        number.textContent = i / 5 + 1;
        element.appendChild(number);

        const symbol = document.createElement("div");
        symbol.className = "symbol";
        symbol.textContent = table[i];
        element.appendChild(symbol);

        const detail = document.createElement("div");
        detail.className = "detail";
        detail.innerHTML = `${table[i + 1]}<br/>${table[i + 2]}`;
        element.appendChild(detail);

        const object = new CSS3DObject(element);
        object.position.set(
          Math.random() * 4000 - 2000,
          Math.random() * 4000 - 2000,
          Math.random() * 4000 - 2000
        );
        scene.add(object);
        objects.push(object);
      }

      const objLength = objects.length;

      function createTableVertices() {
        for (let i = 0; i < len; i += 5) {
          const object = new THREE.Object3D();
          object.position.x = table[i + 3] * 140 - 1760;
          object.position.y = -table[i + 4] * 180 + 1000;
          object.position.z = 0;

          targets.table.push(object);
        }
      }

      function createGridVertices() {
        for (let i = 0; i < objLength; ++i) {
          const object = new THREE.Object3D();

          object.position.x = 360 * (i % 5) - 800;
          object.position.y = -360 * (((i / 5) >> 0) % 5) + 700;
          object.position.z = -700 * ((i / 25) >> 0);

          targets.grid.push(object);
        }
      }

      function createHelixVertices() {
        const vector = new THREE.Vector3();

        for (let i = 0; i < objLength; ++i) {
          let phi = i * 0.213 + Math.PI;

          const object = new THREE.Object3D();

          object.position.x = 800 * Math.sin(phi);
          object.position.y = -(i * 8) + 450;
          object.position.z = 800 * Math.cos(phi + Math.PI);

          object.scale.set(1.1, 1.1, 1.1);

          vector.x = object.position.x * 2;
          vector.y = object.position.y;
          vector.z = object.position.z * 2;

          object.lookAt(vector);

          targets.helix.push(object);
        }
      }

      function createSphereVertices() {
        const vector = new THREE.Vector3();

        for (let i = 0; i < objLength; ++i) {
          let phi = Math.acos(-1 + (2 * i) / objLength);
          let theta = Math.sqrt(objLength * Math.PI) * phi;
          const object = new THREE.Object3D();

          object.position.x = 800 * Math.cos(theta) * Math.sin(phi);
          object.position.y = 800 * Math.sin(theta) * Math.sin(phi);
          object.position.z = -800 * Math.cos(phi);

          // rotation object

          vector.copy(object.position).multiplyScalar(2);
          object.lookAt(vector);
          targets.sphere.push(object);
        }
      }

      createTableVertices();
      createGridVertices();
      createHelixVertices();
      createSphereVertices();

      function transform(targets, duration) {
        TWEEN.removeAll();

        for (let i = 0; i < objLength; ++i) {
          let object = objects[i];
          let target = targets[i];

          new TWEEN.Tween(object.position)
            .to(
              {
                x: target.position.x,
                y: target.position.y,
                z: target.position.z,
              },
              Math.random() * duration + duration
            )
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

          new TWEEN.Tween(object.rotation)
            .to(
              {
                x: target.rotation.x,
                y: target.rotation.y,
                z: target.rotation.z,
              },
              Math.random() * duration + duration
            )
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        }

        // 这个补间用来在位置与旋转补间同步执行，通过onUpdate在每次更新数据后渲染scene和camera
        new TWEEN.Tween({})
          .to({}, duration * 2)
          .onUpdate(render)
          .start();
      }

      function transformSphere2(duration) {
        TWEEN.removeAll();

        const sphereGeom = new THREE.SphereGeometry(800, 10, 9);
        const positions = sphereGeom.attributes.position.array;
        const vector = new THREE.Vector3();

        for (let i = 0; i < objLength; ++i) {
          const target = new THREE.Object3D();

          target.position.fromArray(positions, i * 3); // Extracting position from positions array
          vector.copy(target.position).multiplyScalar(2);
          target.lookAt(vector);

          let object = objects[i];

          new TWEEN.Tween(object.position)
            .to(
              {
                x: target.position.x,
                y: target.position.y,
                z: target.position.z,
              },
              Math.random() * duration + duration
            )
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

          new TWEEN.Tween(object.rotation)
            .to(
              {
                x: target.rotation.x,
                y: target.rotation.y,
                z: target.rotation.z,
              },
              Math.random() * duration + duration
            )
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        }

        new TWEEN.Tween(this)
          .to({}, duration * 2)
          .onUpdate(render)
          .start();
      }

      function transformPlane(duration) {
        TWEEN.removeAll();

        const planeGeom = new THREE.PlaneGeometry(1400, 1800, 9, 9);
        const positions = planeGeom.attributes.position.array;
        const vector = new THREE.Vector3();

        for (let i = 0; i < objLength; ++i) {
          const target = new THREE.Object3D();

          const vertexIndex = i * 3;
          target.position.fromArray(positions, vertexIndex); // Extracting position from positions array

          let object = objects[i];

          new TWEEN.Tween(object.position)
            .to(
              {
                x: target.position.x,
                y: target.position.y,
                z: target.position.z,
              },
              Math.random() * duration + duration
            )
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

          new TWEEN.Tween(object.rotation)
            .to(
              {
                x: target.rotation.x,
                y: target.rotation.y,
                z: target.rotation.z,
              },
              Math.random() * duration + duration
            )
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        }

        new TWEEN.Tween(this)
          .to({}, duration * 2)
          .onUpdate(render)
          .start();
      }

      const gridBtn = document.getElementById("grid");
      const tableBtn = document.getElementById("table");
      const helixBtn = document.getElementById("helix");
      const planeBtn = document.getElementById("plane");
      const sphereBtn = document.getElementById("sphere");
      const sphere2Btn = document.getElementById("sphere2");

      planeBtn.addEventListener(
        "click",
        function () {
          transformPlane(2000);
        },
        false
      );
      sphere2Btn.addEventListener(
        "click",
        function () {
          transformSphere2(2000);
        },
        false
      );
      gridBtn.addEventListener(
        "click",
        function () {
          transform(targets.grid, 2000);
        },
        false
      );
      tableBtn.addEventListener(
        "click",
        function () {
          transform(targets.table, 2000);
        },
        false
      );
      helixBtn.addEventListener(
        "click",
        function () {
          transform(targets.helix, 2000);
        },
        false
      );
      sphereBtn.addEventListener(
        "click",
        function () {
          transform(targets.sphere, 2000);
        },
        false
      );

      window.addEventListener("resize", onWindowResize, false);

      transform(targets.table, 2000);

      render();
    };

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }

    const animation = () => {
      TWEEN.update();
      controls.update();
      requestAnimationFrame(animation);
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    init();
    animation();

    return () => {
      window.removeEventListener("resize", onWindowResize, false);
      // 清空一下WebGLoutput
      if (renderer.domElement) {
        renderer.domElement.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className={Styles.container}>
      <TimeSlider />
      <div className={Styles.menu}>
        <Button type="primary" id="table">
          TABLE
        </Button>
        <Button type="primary" id="sphere">
          SPHERE
        </Button>
        <Button type="primary" id="sphere2">
          SPHERE2
        </Button>
        <Button type="primary" id="plane">
          PLANE
        </Button>
        <Button type="primary" id="helix">
          HELIX
        </Button>
        <Button type="primary" id="grid">
          GRID
        </Button>
      </div>
      <div ref={containerRef} />
    </div>
  );
};

export default Transformer;
