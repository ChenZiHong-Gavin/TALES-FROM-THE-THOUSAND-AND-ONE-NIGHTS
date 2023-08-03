import TheatreStore from "./TheatreStore";
import BlobStore from "./BlobStore";
import EmotionStore from "./EmotionStore";

const theatreStore = new TheatreStore();
const blobStore = new BlobStore();
const emotionStore = new EmotionStore();

const stores = {
    theatreStore,
    blobStore,
    emotionStore
}


export default stores;