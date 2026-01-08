// controllers/admin_controller.jsx

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/api";

export function getAdminEvents() {
  return getEvents();
}

export function createAdminEvent(formData) {
  return createEvent(formData);
}

export function updateAdminEvent(id, updates) {
  return updateEvent(id, updates);
}

export function deleteAdminEvent(id) {
  return deleteEvent(id);
}
