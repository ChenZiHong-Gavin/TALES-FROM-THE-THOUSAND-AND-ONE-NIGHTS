import { observable, action, makeObservable, runInAction } from 'mobx';
import { getSegmentGroupedByEmotion } from '../../api/emotion';

class EmotionStore {

    @observable segmentsGroupByEmotion = [];
    @observable state = "pending"
    @observable mode = "emotion";
    @observable rerender = false;
    @observable roseData = [];
    @observable wordCloudData = [];

    constructor() {
        makeObservable(this);
        this.segmentsGroupByEmotion = [];
        this.state = "pending";
        this.mode = "emotion";
        this.rerender = false;
        this.roseData = [];
        this.wordCloudData = [];
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

    @action clearSegmentsGroupByEmotion = () => {
        this.segmentsGroupByEmotion = [];
        this.state = "pending";
    }

    @action
    setMode = (mode) => {
        this.mode = mode;
    }

    @action
    setRerender = (rerender) => {
        this.rerender = rerender;
    }

    @action
    setRoseData = (roseData) => {
        this.roseData = roseData;
    }

    @action
    setWordCloudData = (wordCloudData) => {
        this.wordCloudData = wordCloudData;
    }

}

export default EmotionStore;