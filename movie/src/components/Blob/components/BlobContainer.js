import Blob from './Blob';
import { inject, observer } from "mobx-react";

const BlobContainer = () => {
  return (
    <div>
      BlobContainer
    </div>
  );
};

export default inject("blobStore")(observer(BlobContainer));