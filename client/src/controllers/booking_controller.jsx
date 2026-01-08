import { getBookings as apiGetBookings, createBooking as apiCreateBooking, deleteBooking as apiDeleteBooking } from '../services/api';

export async function getBookings() {
  return apiGetBookings();
}

export async function createBooking({ eventId }) {
  return apiCreateBooking({ eventId });
}

export async function deleteBooking(id) {
  return apiDeleteBooking(id);
}
