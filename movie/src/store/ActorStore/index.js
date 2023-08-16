import { observable, action, configure, makeObservable } from "mobx";

class ActorStore {
  @observable isShowModal = false;

  constructor() {
    makeObservable(this);
    this.isShowModal = false;
  }

  @action toggleModal = (flag) => {
    this.isShowModal = flag;
  };
}

export default ActorStore;
