import React from 'react';
import { Button } from 'antd';
import useSound from 'use-sound';
import boopSfx from '../../../../assets/mp3/spring.mp3'
import { createRandomBlob } from '../../utils/blob.utils';
import { inject, observer } from 'mobx-react';

const RandomizerButton = ({ playSound }) => {
  const [play] = useSound(boopSfx, { volume: 0.5 });
  return (
    <Button
      onClick={() => {
        if (playSound) play();
        createRandomBlob();
      }}
      type="default"
    >
      摇一摇
    </Button>
  );
};
export default inject("blobStore")(observer(RandomizerButton));
