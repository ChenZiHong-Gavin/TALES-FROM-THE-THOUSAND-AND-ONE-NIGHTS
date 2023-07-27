import TheatreStore from "./TheatreStore";
import BlobStore from "./BlobStore";

const theatreStore = new TheatreStore();
const blobStore = new BlobStore();

const stores = {
    theatreStore,
    blobStore
}


export default stores;