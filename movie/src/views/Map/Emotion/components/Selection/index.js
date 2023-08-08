import DragAndDrop from "./DragAndDrop";
import BlobContainer from "../../../../../components/Blob/components/BlobContainer";
import BlobActionBar from "../../../../../components/Blob/components/BlobActionBar";
import BlobSettingsSection from "../../../../../components/Blob/components/BlobSettingSection";
import Styles from "./Selection.module.scss";
import { Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

const Selection = () => {
  return (
  <ChakraProvider>
    <div className={Styles.selectionContainer}>
      <div className={Styles.blobContainer}>
        <Box>
          <BlobContainer />
          <BlobActionBar />
          <BlobSettingsSection />
        </Box>
      </div>
      <div className={Styles.dragContainer}>
        <DragAndDrop />
      </div>
    </div>
  </ChakraProvider>
  );
};

export default Selection;
