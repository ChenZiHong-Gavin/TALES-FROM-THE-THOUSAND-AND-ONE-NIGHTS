import { inject, observer } from 'mobx-react';
import React from 'react';
import Slider from '../Common/Slider';

const RandomnessSlider = ({ blobStore }) => {
const { growth, updateGrowth, changeImage } = blobStore;
  return <Slider
    name="随机性"
    info="越小随机性越强"
    value={growth}
    min={2}
    max={9}
    onChange={(value) => {
      updateGrowth(value);
      changeImage();
    }}
  />
};

export default inject("blobStore")(observer(RandomnessSlider));
