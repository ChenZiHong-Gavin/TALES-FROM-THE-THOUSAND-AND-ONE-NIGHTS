import { observable, action, configure, makeObservable, runInAction } from "mobx";
import { getActorInfo } from "../../api/actor";

class ActorStore {
  @observable isShowModal = false;
  @observable actorInfo = {
  };

  constructor() {
    makeObservable(this);
    this.isShowModal = false;
    this.actorInfo = {
    };
  }

  @action toggleModal = (flag) => {
    this.isShowModal = flag;
  };

  @action
  getActorInfo = (id) => {
    this.actorInfo = {};
    getActorInfo(id).then(
      (res) => {
        if (res.status == 200) {
          const data = res.data.data;
          console.log(data)
          runInAction(() => {
            this.actorInfo = data;
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

}

export default ActorStore;
