import { observable, action, makeObservable, configure } from "mobx";
import {
  deleteBlob,
  getAllBlobs,
  saveBlob,
} from "../../components/Blob/utils/storage.utils";
configure({ enforceActions: "observed" });

const START_COLOR = "#d1d8e0";
const END_COLOR = "#4a5568";

class BlobStore {
  @observable edges = 6;
  @observable growth = 6;
  @observable size = 500;
  @observable svgPath = "";
  @observable seed = null;
  @observable color = START_COLOR;
  @observable type = "solid";
  @observable colors = [START_COLOR, END_COLOR];
  @observable isOutline = false;
  @observable pattern = "cross";
  @observable image = "https://source.unsplash.com/5PVXkqt2s9k/500x500";
  @observable playSound = false;
  @observable savedBlobs = null;

  constructor() {
    makeObservable(this);
    this.edges = 6;
    this.growth = 6;
    this.size = 500;
    this.svgPath = "";
    this.seed = null;
    this.color = START_COLOR;
    this.type = "solid";
    this.colors = [START_COLOR, END_COLOR];
    this.isOutline = false;
    this.pattern = "cross";
    this.image = "https://source.unsplash.com/5PVXkqt2s9k/500x500";
    this.playSound = false;
    this.savedBlobs = null;
  }

  @action
  getState = () => {
    return {
      edges: this.edges,
      growth: this.growth,
      size: this.size,
      svgPath: this.svgPath,
      seed: this.seed,
      color: this.color,
      type: this.type,
      colors: this.colors,
      isOutline: this.isOutline,
      pattern: this.pattern,
      image: this.image,
      playSound: this.playSound,
    };
  };

  @action
  updateEdges = (value) => {
    this.edges = value;
  };

  @action
  updateGrowth = (value) => {
    this.growth = value;
    console.log(this);
  };

  @action
  updatePath = ({ svgPath, seed }) => {
    this.svgPath = svgPath;
    this.seed = seed;
  };

  @action
  switchToSolidColor = (color) => {
    this.color = color;
    this.type = "solid";
    this.colors = [START_COLOR, END_COLOR];
    this.pattern = null;
  };

  @action
  switchToGradientColors = (colors) => {
    this.colors = colors;
    this.type = "gradient";
    this.color = START_COLOR;
    this.pattern = null;
  };

  @action
  switchToImage = (url) => {
    this.image = url;
    this.type = "image";
    this.color = START_COLOR;
    this.colors = [START_COLOR, END_COLOR];
    this.pattern = null;
  };

  @action
  switchToPattern = (name) => {
    this.pattern = name;
    this.type = "pattern";
    this.color = START_COLOR;
    this.colors = [START_COLOR, END_COLOR];
    this.image = "";
  };

  @action
  updateGradientStartColor = (color) => {
    this.colors = [color, this.colors[1]];
    this.type = "gradient";
    this.color = START_COLOR;
  };

  @action
  updateGradientEndColor = (color) => {
    this.colors = [this.colors[0], color];
    this.type = "gradient";
    this.color = START_COLOR;
  };

  @action
  toggleOutline = () => {
    this.isOutline = !this.isOutline;
  };

  @action
  updateSize = (size) => {
    this.size = size;
  };

  @action
  blobLoaded = (status) => {
    this.blobCode = status;
  };

  @action
  toggleSound = () => {
    this.playSound = !this.playSound;
  };

  @action
  saveBlob = () => {
    const blobs = saveBlob(this);
    this.savedBlobs = blobs;
  };

  @action
  deleteBlob = (id) => {
    const blobs = deleteBlob(id);
    this.savedBlobs = blobs;
  };

  @action
  loadBlobs = () => {
    const blobs = getAllBlobs();
    this.savedBlobs = blobs;
  };

  @action
  resetStore = () => {
    Object.assign(this, new BlobStore());
  };

  @action
  setStaticBlobData = (data) => {
    Object.assign(this, data);
  };
}

export default BlobStore;
