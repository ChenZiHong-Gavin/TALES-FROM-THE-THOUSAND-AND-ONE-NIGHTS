import { fetchGet } from "./http/http";

export function getPictureListSelected(limit){
  return fetchGet('/api/image/list?limit='+limit);
}