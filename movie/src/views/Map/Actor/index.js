import Styles from "./Actor.module.scss";
import {
  removeItemFromArray,
  removeRandomFromArray,
  getRandomFromArray,
  normalWalk,
  resetPeep,
} from "./utils";
import Peep from "./utils";
import Script from "react-load-script";
import { useEffect, useState } from "react";
import avatarUrl from "../../../assets/png/avatar.png";
import ReturnButton from "../../../components/ReturnButton";

const config = {
  src: avatarUrl,
  rows: 12,
  cols: 9,
};

function Actor() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    const gsap = window.gsap;

    const walks = [normalWalk];

    const img = document.createElement("img");
    img.onload = init;
    img.src = config.src;
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const stage = {
      width: 0,
      height: 0,
    };
    const allPeeps = [];
    const availablePeeps = [];
    const crowd = [];

    function init() {
      createPeeps();
      // resize also (re)populates the stage
      resize();
      gsap.ticker.add(render);
      window.addEventListener("resize", resize);
    }

    function createPeeps() {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i=0; i<total;i++) {
        allPeeps.push(
          new Peep({
            image: img,
            index: i + 1,
            rect: [
              (i % rows) * rectWidth + 1,
              ((i / rows) | 0) * rectHeight + 1,
              rectWidth - 2,
              rectHeight - 2,
            ],
            canvas
          })
        );
      }
    }

    function resize() {
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((peep) => {
        peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    }

    function initCrowd() {
      const desiredCrowdSize = 60;
      while (availablePeeps.length && crowd.length < desiredCrowdSize) {
        // setting random tween progress spreads the peeps out
        addPeepToCrowd().walk.progress(Math.random());
      }
    }

    function addPeepToCrowd() {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
          gsap,
        }),
        gsap,
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    }

    function removePeepFromCrowd(peep) {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    }

    function render() {
      canvas.width = canvas.width;
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    }
  }, [loading]);

  return (
    <>
      <ReturnButton />
      <div className={Styles.Actor}>
        <canvas className={Styles.canvas} id="canvas"></canvas>
        <Script
          url={process.env.PUBLIC_URL + "/gsap.min.js"}
          onLoad={() => setLoading(false)}
        />
      </div>
    </>
  );
}

export default Actor;
