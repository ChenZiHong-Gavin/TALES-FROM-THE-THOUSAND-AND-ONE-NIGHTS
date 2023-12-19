import RoseChart from './components/RoseChart';
import WordCloudChart from './components/WordCloudChart';
import Styles from './EmotionChart.module.scss';

const EmotionChart = () => {
  return (
    <div className={Styles.chart}>
      <WordCloudChart />
      <RoseChart />
    </div>
  )
}

export default EmotionChart;
