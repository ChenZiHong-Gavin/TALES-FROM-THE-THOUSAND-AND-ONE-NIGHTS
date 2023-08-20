import TheatreStore from "./TheatreStore";
import EmotionStore from "./EmotionStore";
import BlobStore  from "./BlobStore";
import ActorStore from "./ActorStore";
import PhotoStore from "./PhotoStore";

const theatreStore = new TheatreStore();
const emotionStore = new EmotionStore();
const blobStore = new BlobStore();
const actorStore = new ActorStore();
const photoStore = new PhotoStore();

const stores = {
    theatreStore,
    emotionStore,
    blobStore,
    actorStore,
    photoStore
}


export default stores;