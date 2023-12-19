import { observable, action, makeObservable, runInAction } from "mobx";
class PhotoStore {
    @observable eventRange = [1924, 2005];
    constructor() {
        makeObservable(this);
        this.eventRange = [1924, 2005];
    }

    @action setEventRange = (range) => {
        this.eventRange = range;
    }
}

export default PhotoStore;
