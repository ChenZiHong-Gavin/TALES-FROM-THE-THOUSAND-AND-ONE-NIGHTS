import { fetchGet } from "./http/http";

export function getRandomActor(limit) {
  return fetchGet("/api/pictures/actors?limit=" + limit);
}

export function getActorsWithAvatar() {
  return fetchGet("/api/avatars/actors")
}


export function getActorInfo(id) {
  return fetchGet("/api/info/actor/id?id=" + id);
}