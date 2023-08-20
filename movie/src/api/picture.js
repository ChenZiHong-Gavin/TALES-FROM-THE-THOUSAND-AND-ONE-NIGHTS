import { fetchGet } from "./http/http";

export function getPictureListSelected(limit) {
    return fetchGet('/api/image/info/list?limit=' + limit);
}

// /image/info
export function getPictureById(pictureId) {
    return fetchGet('/api/image/info?pictureId=' + pictureId);
}
