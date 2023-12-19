import { fetchGet } from "./http/http";

export function getSegmentGroupedByEmotion(){
  return fetchGet('/api/getSegmentByEmotion');
}