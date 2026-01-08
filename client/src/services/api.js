// services/api.js

async function request(path, opts = {}) {
  const res = await fetch(path, opts);

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed (${res.status})`);
  }

  if (res.status === 204) return null;
  return res.json();
}

/* ---------------- EVENTS ---------------- */

export function getEvents() {
  return request("/api/events");
}

export function getEventById(id) {
  return request(`/api/events/${id}`);
}

export function createEvent(formData) {
  return request("/api/events", {
    method: "POST",
    body: formData,
  });
}

export function updateEvent(id, formData) {
  return request(`/api/events/${id}`, {
    method: "PUT",
    body: formData,
  });
}

export function deleteEvent(id) {
  return request(`/api/events/${id}`, { method: "DELETE" });
}

/* ---------------- BOOKINGS ---------------- */

export function getBookings() {
  return request("/api/bookings");
}

export function createBooking(payload) {
  return request("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function deleteBooking(id) {
  return request(`/api/bookings/${id}`, { method: "DELETE" });
}
