import Script from "react-load-script";
import { useEffect, useState } from "react";
import "../../../assets/css/juxtapose.css";

function Juxtapose() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  return (
    <div>
    <Script
        url={process.env.PUBLIC_URL + "/juxtapose.min.js"}
        onLoad={() => setLoading(false)}
    />
    <div className="juxtapose">
        <img src="http://img.library.sh.cn/dy/img/vrh8m2mtt6hhoyyo.jpg" />
        <img src="http://img.library.sh.cn/dy/img/yjz50kwuvtn2h6ur.jpg" />
    </div>
    </div>
  );
}

export default Juxtapose;

