import React, { useEffect, useState } from "react";
import {
  getAdminEvents,
  createAdminEvent,
  updateAdminEvent,
  deleteAdminEvent,
} from "../../controllers/admin_controller";

const emptyForm = {
  title: "",
  location: "",
  date: "",
  price: "",
  seats: "",
  description: "",
  image: null,
};

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [previews, setPreviews] = useState({}); // image previews for edit

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const data = await getAdminEvents();
    setEvents(data || []);
  }

  // ---------------- ADD EVENT ----------------
  async function handleAdd(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("location", form.location || "");
    formData.append("date", form.date || "");
    formData.append("price", form.price || "");
    formData.append("seats", form.seats || "");
    formData.append("description", form.description || "");
    if (form.image) formData.append("image", form.image);

    const created = await createAdminEvent(formData);
    setEvents((p) => [created, ...p]);
    setForm(emptyForm);
  }

  // ---------------- UPDATE EVENT ----------------
  async function handleUpdate(id) {
    const ev = events.find((e) => e.id === id);
    if (!ev) return;

    const formData = new FormData();
    formData.append("title", ev.title || "");
    formData.append("location", ev.location || "");
    formData.append("date", ev.date || "");
    formData.append("price", ev.price ?? "");
    formData.append("seats", ev.seats ?? "");
    formData.append("description", ev.description || "");

    // Only send file if changed
    if (ev.file instanceof File) {
      formData.append("image", ev.file);
    }

    const updated = await updateAdminEvent(id, formData);
    setEvents((prev) => prev.map((x) => (x.id === id ? updated : x)));
    setEditingId(null);
    setPreviews((p) => ({ ...p, [id]: null }));
  }

  // ---------------- DELETE EVENT ----------------
  async function handleDelete(id) {
    await deleteAdminEvent(id);
    setEvents((p) => p.filter((e) => e.id !== id));
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin — Events</h1>

      {/* ADD EVENT */}
      <section className="mb-8 p-4 border rounded-lg bg-white shadow-sm">
        <h2 className="font-semibold mb-3">Add New Event</h2>
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          encType="multipart/form-data"
        >
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />
          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            placeholder="Seats"
            value={form.seats}
            onChange={(e) => setForm({ ...form, seats: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border px-3 py-2 rounded md:col-span-3"
          />
          <button className="bg-green-600 text-white py-2 rounded md:col-span-3">
            Add Event
          </button>
        </form>
      </section>

      {/* EVENT LIST */}
      <section>
        <h2 className="font-semibold mb-4">Existing Events</h2>
        <ul className="space-y-4">
          {events.map((ev) => (
            <li
              key={ev.id}
              className="border rounded-lg p-4 flex gap-4 bg-white shadow-sm"
            >
              {/* IMAGE */}
              <div className="w-48 shrink-0">
                <img
                  src={
                    previews[ev.id] ||
                    ev.image ||
                    "/event-placeholder.png"
                  }
                  alt={ev.title}
                  className="w-full h-28 object-cover rounded"
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                {editingId === ev.id ? (
                  <div className="space-y-2">
                    <input
                      value={ev.title}
                      onChange={(e) =>
                        setEvents((p) =>
                          p.map((x) =>
                            x.id === ev.id ? { ...x, title: e.target.value } : x
                          )
                        )
                      }
                      className="w-full border px-2 py-1 rounded"
                      placeholder="Title"
                    />

                    <input
                      value={ev.location || ""}
                      onChange={(e) =>
                        setEvents((p) =>
                          p.map((x) =>
                            x.id === ev.id
                              ? { ...x, location: e.target.value }
                              : x
                          )
                        )
                      }
                      className="w-full border px-2 py-1 rounded"
                      placeholder="Location"
                    />

                    <input
                      type="date"
                      value={ev.date ? ev.date.slice(0, 10) : ""}
                      onChange={(e) =>
                        setEvents((p) =>
                          p.map((x) =>
                            x.id === ev.id ? { ...x, date: e.target.value } : x
                          )
                        )
                      }
                      className="w-full border px-2 py-1 rounded"
                    />

                    <input
                      type="number"
                      value={ev.price ?? ""}
                      onChange={(e) =>
                        setEvents((p) =>
                          p.map((x) =>
                            x.id === ev.id ? { ...x, price: e.target.value } : x
                          )
                        )
                      }
                      className="w-full border px-2 py-1 rounded"
                      placeholder="Price"
                    />

                    <input
                      type="number"
                      value={ev.seats ?? ""}
                      onChange={(e) =>
                        setEvents((p) =>
                          p.map((x) =>
                            x.id === ev.id ? { ...x, seats: e.target.value } : x
                          )
                        )
                      }
                      className="w-full border px-2 py-1 rounded"
                      placeholder="Seats"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setEvents((p) =>
                          p.map((x) =>
                            x.id === ev.id ? { ...x, file } : x
                          )
                        );

                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () =>
                            setPreviews((p) => ({ ...p, [ev.id]: reader.result }));
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="border px-2 py-1 rounded"
                    />

                    <textarea
                      value={ev.description || ""}
                      onChange={(e) =>
                        setEvents((p) =>
                          p.map((x) =>
                            x.id === ev.id
                              ? { ...x, description: e.target.value }
                              : x
                          )
                        )
                      }
                      className="w-full border px-2 py-1 rounded"
                      placeholder="Description"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-lg">{ev.title}</h3>
                    <p className="text-sm text-gray-600">
                      {ev.location} • {ev.date}
                    </p>
                    <p className="mt-2 text-sm">
                      Price: {ev.price ? `₹${ev.price}` : "Free"} • Seats:{" "}
                      {ev.seats || "N/A"}
                    </p>
                  </>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-2">
                {editingId === ev.id ? (
                  <button
                    onClick={() => handleUpdate(ev.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingId(ev.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDelete(ev.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
