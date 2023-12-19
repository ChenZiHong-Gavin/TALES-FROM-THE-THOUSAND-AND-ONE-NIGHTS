import { fetchGet } from "./http/http";

export function getSegmentById(segmentId){
  return fetchGet('/api/info/segment?segmentId=' + segmentId);
}