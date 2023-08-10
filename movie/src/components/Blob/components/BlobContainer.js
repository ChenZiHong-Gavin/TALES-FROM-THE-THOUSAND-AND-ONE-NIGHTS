import { useEffect } from 'react';
import {
  createFixedBlob,
  createInitialBlob,
  setBlobTheme,
} from '../utils/blob.utils';
import Blob from './Blob';
import { inject, observer } from 'mobx-react'; 
import { useNavigate } from 'react-router-dom';

const BlobContainer = ({blobStore}) => {
  const navigate = useNavigate();
  const { edges, growth, color, colors, type, isOutline, svgPath, orderArray, imageList} = blobStore;
  useEffect(() => {
    createInitialBlob(blobStore);
  }, []);

  useEffect(() => {
    console.log(orderArray);
  }, [orderArray]);

  useEffect(() => {
    if (svgPath) createFixedBlob(blobStore);
  }, [growth]);

  useEffect(() => {
    if (svgPath) createFixedBlob(blobStore, false);
  }, [edges]);

  useEffect(() => {
    if (svgPath) setBlobTheme(blobStore);
  }, [color, colors, isOutline, type]);

  const handleBlobClick = () => {
    const videoId = imageList[0].videoId;
    navigate(`/movie?videoId=${videoId}`);
  }

  return <Blob {...blobStore} 
    handleBlobClick={handleBlobClick}
  />;
};

export default inject("blobStore")(observer(BlobContainer));