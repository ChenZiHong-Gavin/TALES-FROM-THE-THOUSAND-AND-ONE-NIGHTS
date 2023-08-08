import { useEffect } from 'react';
import {
  createFixedBlob,
  createInitialBlob,
  setBlobTheme,
} from '../utils/blob.utils';
import Blob from './Blob';
import { inject, observer } from 'mobx-react'; 

const BlobContainer = ({blobStore}) => {
  const { edges, growth, color, colors, type, isOutline, svgPath } = blobStore;
  useEffect(() => {
    createInitialBlob(blobStore);
  }, []);

  useEffect(() => {
    if (svgPath) createFixedBlob(blobStore);
  }, [growth]);

  useEffect(() => {
    if (svgPath) createFixedBlob(blobStore, false);
  }, [edges]);

  useEffect(() => {
    if (svgPath) setBlobTheme(blobStore);
  }, [color, colors, isOutline, type]);

  return <Blob {...blobStore} />;
};

export default inject("blobStore")(observer(BlobContainer));