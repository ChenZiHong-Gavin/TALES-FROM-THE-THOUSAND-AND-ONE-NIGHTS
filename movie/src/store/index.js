import TheatreStore from "./TheatreStore";
import EmotionStore from "./EmotionStore";
import BlobStore  from "./BlobStore";
import ActorStore from "./ActorStore";

const theatreStore = new TheatreStore();
const emotionStore = new EmotionStore();
const blobStore = new BlobStore();
const actorStore = new ActorStore();

const stores = {
    theatreStore,
    emotionStore,
    blobStore,
    actorStore
}


export default stores;