import { observable, action, makeObservable, runInAction } from 'mobx';
import { getSegmentGroupedByEmotion } from '../../api/emotion';

class EmotionStore {

    @observable segmentsGroupByEmotion = [];
    @observable state = "pending"
    @observable mode = "emotion";

    constructor() {
        makeObservable(this);
        this.segmentsGroupByEmotion = [];
        this.state = "pending";
        this.mode = "emotion";
    }

    @action
    fetchSegmentsGroupByEmotion = () => {
        this.segmentsGroupByEmotion = [];
        this.state = "pending";
        getSegmentGroupedByEmotion().then(
            (res) => {
                const data = res.data.data;
                runInAction(() => {
                    this.segmentsGroupByEmotion = data;
                    this.state = "done";
                })
            },
            (err) => {
                this.state = "error";
            }
        )
    }

    @action
    setMode = (mode) => {
        this.mode = mode;
    }

}

export default EmotionStore;