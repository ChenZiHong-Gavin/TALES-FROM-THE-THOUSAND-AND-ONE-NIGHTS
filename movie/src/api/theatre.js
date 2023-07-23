import { fetchGet } from "./http/http";

export function getTheatreInfoSelected(theatreId) {
  return fetchGet('/api/info/theatres?theatreId=' + theatreId);
}