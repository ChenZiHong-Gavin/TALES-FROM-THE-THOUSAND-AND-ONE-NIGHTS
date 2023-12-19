import { Timeline } from '@knight-lab/timelinejs';
import '@knight-lab/timelinejs/dist/css/timeline.css';
import { useEffect, useRef } from 'react';
import timeLineData from "../../../assets/json/timeline.json"
import './timeline.css';


function TimeLine() {
  const timelineRef = useRef(null);
  useEffect(() => {
    if (!timelineRef.current) {
      return;
    }
    async function fetchData(url) {
      // const response = await window.fetch(url);
      // const json = await response.json();
      var options = {
        initial_zoom: 8,
        lang: 'zh-cn',
        hash_bookmark: true,
      }
      const json = timeLineData;
      new Timeline('timeline', json, options);
    }
    // 要先加载完json
    fetchData();
  }, []);


  return (
    <div id="timeline" ref={timelineRef}></div>
  )
}

export default TimeLine;
