import { CheckCircleIcon } from '@chakra-ui/icons';
import React from 'react';
import { inject, observer } from 'mobx-react';
import Ding from '../Common/Ding';
import { OutlineIcon } from '../Common/Icons';

const OutlineToggleButton = ({blobStore}) => {
  const { isOutline, toggleOutline } = blobStore;
  return <Ding
    label="轮廓"
    Icon={OutlineIcon}
    isSelected={isOutline === true}
    activeComp={<CheckCircleIcon fontSize="xs" color="primary" />}
    onClick={toggleOutline}
  />

}

export default inject("blobStore")(observer(OutlineToggleButton));