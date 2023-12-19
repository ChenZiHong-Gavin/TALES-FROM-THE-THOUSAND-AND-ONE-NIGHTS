import { fetchGet } from "./http/http";

// 获取视频的详细信息
export function getVideoInfoSelected(videoId) {
  return fetchGet('/api/info/videos?videoId=' + videoId);
}

// 根据emotion顺序获取视频详细信息
export function getVideoInfoByEmotionOrder(emotionOrder) {
  return fetchGet('/api/videos/emotionOrder?emotionOrder=' + emotionOrder);
}