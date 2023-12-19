import { observable, action, configure, makeObservable } from 'mobx';
import geojson from '../../assets/json/geojson.json'
configure({ enforceActions: 'observed' });

class TheatreStore {
  
    // 展示modal
    @observable isShowModal = false;
    @observable theatreId = 1;
    @observable suits = [];


    constructor() {
      makeObservable(this);
      this.isShowModal = false;
      this.theatreId = 1;
      this.suits = [];
    }

    @action toggleModal = (flag) => {
        this.isShowModal = flag;
    }

    @action setTheatreId = (id) => {
      this.theatreId = id;
    }

    @action setSuits = (id) => {
      this.suits = geojson["features"][id-1]["properties"]["suits"]
    }

}

export default TheatreStore;