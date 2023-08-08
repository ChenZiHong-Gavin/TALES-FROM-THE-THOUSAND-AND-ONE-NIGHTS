import Styles from './EmotionPiece.module.scss'

const EmotionPiece = (props) => {
  const emotionData = props.emotionData;
  console.log(emotionData);
  return (
    <div className={Styles.emotionPiece}>
    {
      // 如果emotionData不为空
      emotionData && emotionData.map((item, index) => {
        return (
          <div key={index} className={Styles.emotionPieceItem} style={{left: item.time + '%'}}>
            <div className={Styles.emotionPieceItemContent}>
              <div className={Styles.emotionPieceItemContentEmotion}>
                {item.emotionId}
              </div>
              <div className={Styles.emotionPieceItemContentTime}>
                aaa
              </div>
            </div>
          </div>
        )
      })
    }
    </div>
  )
}

export default EmotionPiece;