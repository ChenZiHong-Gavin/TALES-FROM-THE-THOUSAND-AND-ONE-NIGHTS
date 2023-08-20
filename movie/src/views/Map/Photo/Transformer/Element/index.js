import Styles from "./Element.module.scss";

const Element = ({props, onClick}) => {
  const { imgPath, date, creator, movie, type, donator, movieName } = props;

  return (
    <div className={Styles.element}
    style={
      {
        backgroundImage: `url(${imgPath})`,
        backgroundSize: 'cover', // 将背景图片缩放以覆盖整个元素
        backgroundPosition: 'center center', // 将背景图片居中对齐
      }
    }
    onClick={(e) => {
      onClick(e); // 将事件参数传递给点击事件处理程序
    }}
    >
      <div className={Styles.symbol}>{type}</div>
      <div className={Styles.detail}>
        <a
          href={movie}
          target="_blank"
        >
          《{movieName}》
        </a>
        <br />
        {date}
      </div>
    </div>
  );
};

export default Element;
