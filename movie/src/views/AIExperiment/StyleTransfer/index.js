import Script from "react-load-script";
import { useEffect, useState } from "react";

const StyleTransfer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  return (
    <div>
      <h1>StyleTransfer</h1>
      <Script
        url={process.env.PUBLIC_URL + "/juxtapose.min.js"}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default StyleTransfer;
