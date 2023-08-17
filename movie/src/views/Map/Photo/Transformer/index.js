import Styles from "./Transformer.module.scss"
import { Button } from "antd";
import Element from "./Element";

const Transformer = () => {
  return (
    <div className={Styles.container}>
      <Element />
      <div className={Styles.menu}>
        <Button type="primary" id="table">TABLE</Button>
        <Button type="primary" id="sphere">SPHERE</Button>
        <Button type="primary" id="sphere2">SPHERE2</Button>
        <Button type="primary" id="plane">PLANE</Button>
        <Button type="primary" id="helix">HELIX</Button>
        <Button type="primary" id="grid">GRID</Button>
      </div>
    </div>
  );
};

export default Transformer;
