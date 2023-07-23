import { observable, action, configure, makeObservable } from 'mobx';
configure({ enforceActions: 'observed' });

class TheatreStore {
  
    // 展示modal
    @observable isShowModal = false;
    @observable theatreId = 1;


    constructor() {
      makeObservable(this);
      this.isShowModal = false;
      this.theatreId = 1;
    }

    @action toggleModal = (flag) => {
        this.isShowModal = flag;
    }

    @action setTheatreId = (id) => {
      this.theatreId = id;
    }

}

export default TheatreStore;