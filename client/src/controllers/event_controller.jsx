import { getEvents as apiGetEvents, getEventById as apiGetEventById } from "../services/api";

export async function getEvents() {
  return apiGetEvents();
}

export async function getEventById(id) {
  return apiGetEventById(id);
}
