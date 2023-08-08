import TheatreStore from "./TheatreStore";
import EmotionStore from "./EmotionStore";
import BlobStore  from "./BlobStore";

const theatreStore = new TheatreStore();
const emotionStore = new EmotionStore();
const blobStore = new BlobStore();

const stores = {
    theatreStore,
    emotionStore,
    blobStore
}


export default stores;