import Styles from "./Element.module.scss";

const Element = () => {
  return (
    <div className={Styles.element}>
      <div className={Styles.number}>1</div>
      <div className={Styles.symbol}>H</div>
      <div className={Styles.detail}>
        Hydrogen
        <br />
        1.00794
      </div>
    </div>
  );
};

export default Element;
