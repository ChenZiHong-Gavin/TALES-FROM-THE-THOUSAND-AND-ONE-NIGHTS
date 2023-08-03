import { Rose } from '@ant-design/plots';
import { inject, observer } from 'mobx-react';

const RoseChart = ({emotionStore}) => {
    if (!emotionStore || !emotionStore.roseData) {
    return null;
  }

  const { roseData: data } = emotionStore;

  const colors = ['#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    color: colors,
    radius: 0.9,
    legend: {
      position: 'right',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Rose {...config} style = {
    {
      height: '300px',
    }
  }
  />
}

export default inject('emotionStore')(observer(RoseChart));
