import React from 'react';
import { Button } from 'antd';
import { createRandomBlob } from '../../utils/blob.utils';
import { inject, observer } from 'mobx-react';

const RandomizerButton = ({ blobStore }) => {
  const { changeImage } = blobStore;
  return (
    <Button
      onClick={() => {
        createRandomBlob();
        changeImage();
      }}
      type="default"
    >
      摇一摇
    </Button>
  );
};
export default inject("blobStore")(observer(RandomizerButton));
