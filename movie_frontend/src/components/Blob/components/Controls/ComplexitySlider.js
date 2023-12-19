import React from "react";
import { inject, observer } from "mobx-react";
import Slider from "../Common/Slider";

const ComplexitySlider = ({ blobStore }) => {
  const { edges, updateEdges, changeImage } = blobStore;
  return (
    <Slider
      name="复杂性"
      info="越大复杂性越强"
      value={edges}
      min={3}
      max={20}
      onChange={(value) => {
        updateEdges(value);
        changeImage();
      }} 
    />
  );
};

export default inject("blobStore")(observer(ComplexitySlider));