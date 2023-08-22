import TheatreStore from "./TheatreStore";
import EmotionStore from "./EmotionStore";
import BlobStore  from "./BlobStore";
import ActorStore from "./ActorStore";
import PhotoStore from "./PhotoStore";
import MovieStore from "./MovieStore";

const theatreStore = new TheatreStore();
const emotionStore = new EmotionStore();
const blobStore = new BlobStore();
const actorStore = new ActorStore();
const photoStore = new PhotoStore();
const movieStore = new MovieStore();

const stores = {
    theatreStore,
    emotionStore,
    blobStore,
    actorStore,
    photoStore,
    movieStore
}


export default stores;