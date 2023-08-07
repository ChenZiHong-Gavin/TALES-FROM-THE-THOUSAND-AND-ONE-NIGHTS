import { fetchGet } from "./http/http";

// 获取视频的详细信息
export function getVideoInfoSelected(videoId) {
  return fetchGet('/api/info/videos?videoId=' + videoId);
}