import { index } from "d3";

const randomRange = (min, max) => min + Math.random() * (max - min);

const randomIndex = (array) => randomRange(0, array.length) | 0;

const removeFromArray = (array, i) => array.splice(i, 1)[0];

const removeItemFromArray = (array, item) =>
  removeFromArray(array, array.indexOf(item));

const removeRandomFromArray = (array) =>
  removeFromArray(array, randomIndex(array));

const getRandomFromArray = (array) => array[randomIndex(array) | 0];

const resetPeep = ({ stage, peep, gsap }) => {
  const direction = Math.random() > 0.5 ? 1 : -1;
  // using an ease function to skew random to lower values to help hide that peeps have no legs
  const offsetY = 50 - 250 * gsap.parseEase("power2.in")(Math.random());
  const startY = stage.height - peep.height + offsetY;
  let startX;
  let endX;

  if (direction === 1) {
    startX = -peep.width;
    endX = stage.width;
    peep.scaleX = 1;
  } else {
    startX = stage.width + peep.width;
    endX = 0;
    peep.scaleX = -1;
  }

  peep.x = startX;
  peep.y = startY;
  peep.anchorY = startY;

  return {
    startX,
    startY,
    endX,
  };
};

const normalWalk = ({ peep, props, gsap }) => {
  const { startX, startY, endX } = props;

  const xDuration = 20;
  const yDuration = 0.5;

  const tl = gsap.timeline();
  tl.timeScale(randomRange(0.5, 1.5));
  tl.to(
    peep,
    {
      duration: xDuration,
      x: endX,
      ease: "none",
    },
    0
  );
  tl.to(
    peep,
    {
      duration: yDuration,
      repeat: xDuration / yDuration,
      yoyo: true,
      y: startY - 10,
    },
    0
  );

  return tl;
};

class Peep {
  constructor({ image, index, rect, canvas }) {
    this.image = image;
    this.index = index;
    this.setRect(rect);

    this.x = 0;
    this.y = 0;
    this.anchorY = 0;
    this.scaleX = 1;
    this.walk = null;
    this.handleClick = this.handleClick.bind(this);
  }

  setRect(rect) {
    this.rect = rect;
    this.width = rect[2];
    this.height = rect[3];

    this.drawArgs = [this.image, ...rect, 0, 0, this.width, this.height];
  }

  handleClick(e) {
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, 1);
    ctx.drawImage(...this.drawArgs);
    ctx.restore();
  }
}

export {
  randomRange,
  randomIndex,
  removeFromArray,
  removeItemFromArray,
  removeRandomFromArray,
  getRandomFromArray,
  normalWalk,
  resetPeep,
};
export default Peep;
