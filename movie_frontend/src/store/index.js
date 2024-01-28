import TheatreStore from "./TheatreStore";
import EmotionStore from "./EmotionStore";
import ActorStore from "./ActorStore";
import PhotoStore from "./PhotoStore";
import MovieStore from "./MovieStore";

const theatreStore = new TheatreStore();
const emotionStore = new EmotionStore();
const actorStore = new ActorStore();
const photoStore = new PhotoStore();
const movieStore = new MovieStore();

const stores = {
    theatreStore,
    emotionStore,
    actorStore,
    photoStore,
    movieStore
}


export default stores;