import { observable, action, makeObservable, runInAction } from "mobx";
import { getSegmentGroupedByEmotion } from "../../api/emotion";
import { getSegmentById } from "../../api/segment";

class EmotionStore {
  @observable segmentsGroupByEmotion = [];
  @observable state = "pending";
  @observable rerender = false;
  @observable roseData = [];
  @observable wordCloudData = [];
  @observable isShowModal = false;
  @observable segmentInfo = [];

  constructor() {
    makeObservable(this);
    this.segmentsGroupByEmotion = [];
    this.state = "pending";
    this.rerender = false;
    this.roseData = [];
    this.wordCloudData = [];
    this.isShowModal = false;
    this.segmentInfo = [];
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
        });
      },
      (err) => {
        this.state = "error";
      }
    );
  };

  @action clearSegmentsGroupByEmotion = () => {
    this.segmentsGroupByEmotion = [];
    this.state = "pending";
  };

  @action
  setRerender = (rerender) => {
    this.rerender = rerender;
  };

  @action
  setRoseData = (roseData) => {
    this.roseData = roseData;
  };

  @action
  setWordCloudData = (wordCloudData) => {
    this.wordCloudData = wordCloudData;
  };

  @action toggleModal = (flag) => {
    this.isShowModal = flag;
  };

  @action setSegmentInfo = (info) => {
    this.segmentInfo = info;
  };

  @action fetchSegmentInfoById = (id) => {
    this.segmentInfo = [];
    this.state = "pending";
    getSegmentById(id).then(
      (res) => {
        const data = res.data.data;
        runInAction(() => {
          this.segmentInfo = data;
          this.state = "done";
        });
      },
      (err) => {
        this.state = "error";
      }
    );
  };

}

export default EmotionStore;
