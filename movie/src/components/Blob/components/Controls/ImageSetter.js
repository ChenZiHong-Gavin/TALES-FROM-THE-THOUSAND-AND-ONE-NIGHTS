import React from 'react';
import { Box} from '@chakra-ui/react';
import Popover from '../Common/Popover';
import { inject, observer } from 'mobx-react';
import UrlInput from '../Common/UrlInput';
import Ding from '../Common/Ding';
import { ImageIcon, LandscapeIcon } from '../Common/Icons';

const ImageSetter = ({blobStore}) => {
  const { type, image, switchToImage } = blobStore;
  const Picker = () => (
    <Ding
      label="图像"
      Icon={ImageIcon}
      isSelected={type === 'image'}
      activeComp={<LandscapeIcon color="primary" />}
    />
  );
  const Content = ({ close }) => (
    <Box p="3" textAlign="center">
      <UrlInput
        value={image}
        onEnter={(value) => {
          switchToImage(value);
          close();
        }}
      />
    </Box>
  );
  return (
    <Popover props={{ bg: 'red' }} label="Set image" trigger={<Picker />}>
      {(close) => <Content close={close} />}
    </Popover>
  );
};

export default inject("blobStore")(observer(ImageSetter));
