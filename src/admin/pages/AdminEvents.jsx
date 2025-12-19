// src/admin/pages/AdminEvents.jsx
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const initialForm = {
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    price: "",
    totalTickets: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      setLoading(true);
      const res = await api.get("/events");
      setEvents(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingEvent(null);
    setForm(initialForm);
    setOpenModal(true);
  }

  function openEditModal(ev) {
    setEditingEvent(ev);
    setForm({
      title: ev.title || "",
      description: ev.description || "",
      date: ev.date || "",
      time: ev.time || "",
      venue: ev.venue || "",
      price: ev.price || "",
      totalTickets: ev.totalTickets || "",
    });
    setOpenModal(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.date || !form.price) {
      toast.error("Title, Date and Price are required");
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      date: form.date,
      time: form.time,
      venue: form.venue,
      price: Number(form.price),
      totalTickets: Number(form.totalTickets),
    };

    try {
      if (editingEvent) {
        toast.loading("Updating event...");
        await api.put(`/events/${editingEvent.id}`, payload);
        toast.dismiss();
        toast.success("Event updated");
      } else {
        toast.loading("Creating event...");
        await api.post("/events", payload);
        toast.dismiss();
        toast.success("Event created");
      }

      setOpenModal(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Operation failed");
    }
  }

  async function handleDelete(ev) {
    const ok = window.confirm(`Delete event "${ev.title}"?`);
    if (!ok) return;

    try {
      toast.loading("Deleting...");
      await api.delete(`/events/${ev.id}`);
      toast.dismiss();
      toast.success("Deleted");
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Delete failed");
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Events Management</h1>
          <p className="text-sm text-gray-500">Create, edit and delete events</p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus /> Add Event
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          events.map(ev => (
            <div key={ev.id} className="bg-white rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold">{ev.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{ev.description}</p>

              <div className="text-sm mt-3 space-y-1">
                <div><b>Date:</b> {ev.date}</div>
                <div><b>Time:</b> {ev.time}</div>
                <div><b>Venue:</b> {ev.venue}</div>
                <div><b>Price:</b> ₹{ev.price}</div>
                <div><b>Total Tickets:</b> {ev.totalTickets}</div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEditModal(ev)}
                  className="flex-1 flex items-center justify-center gap-2 border border-purple-600 text-purple-700 px-3 py-2 rounded"
                >
                  <FiEdit /> Edit
                </button>

                <button
                  onClick={() => handleDelete(ev)}
                  className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-xl p-6 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4"
            >
              <FiX size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editingEvent ? "Edit Event" : "Add Event"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-3 border rounded" />
              <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" className="w-full p-3 border rounded" />
              <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-3 border rounded" />
              <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full p-3 border rounded" />
              <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-3 border rounded" />
              <input type="number" name="totalTickets" value={form.totalTickets} onChange={handleChange} placeholder="Total Tickets" className="w-full p-3 border rounded" />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows="3" className="w-full p-3 border rounded" />

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setOpenModal(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-purple-700 text-white rounded">
                  {editingEvent ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
