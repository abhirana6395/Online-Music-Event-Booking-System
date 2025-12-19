// src/admin/pages/AdminVenues.jsx
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";

export default function AdminVenues() {
  const [venues, setVenues] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const emptyForm = {
    name: "",
    city: "",
    address: "",
    capacity: "",
    status: "active",
  };

  const [form, setForm] = useState(emptyForm);

  // ================= LOAD VENUES =================
  useEffect(() => {
    loadVenues();
  }, []);

  async function loadVenues() {
    try {
      const res = await api.get("/venues");
      setVenues(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load venues");
    }
  }

  // ================= OPEN MODALS =================
  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(v) {
    setEditing(v);
    setForm({
      name: v.name || "",
      city: v.city || "",
      address: v.address || "",
      capacity: v.capacity || "",
      status: v.status || "active",
    });
    setOpen(true);
  }

  // ================= FORM CHANGE =================
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ================= CREATE / UPDATE =================
  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: form.name,
      city: form.city,
      address: form.address,
      capacity: Number(form.capacity),
      status: form.status,
    };

    try {
      if (editing) {
        await api.put(`/venues/${editing.id}`, payload);
        toast.success("Venue updated");
      } else {
        await api.post("/venues", payload);
        toast.success("Venue created");
      }
      setOpen(false);
      loadVenues();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  }

  // ================= DELETE =================
  async function handleDelete(v) {
    if (!window.confirm(`Delete venue "${v.name}"?`)) return;
    try {
      await api.delete(`/venues/${v.id}`);
      toast.success("Venue deleted");
      loadVenues();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Venues</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus /> Add Venue
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {venues.map((v) => (
          <div
            key={v.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{v.name}</h3>
            <p className="text-sm text-gray-600">{v.city}</p>
            <p className="text-sm">Capacity: {v.capacity}</p>
            <p
              className={`text-xs mt-1 ${
                v.status === "active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {v.status}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEdit(v)}
                className="flex-1 border border-purple-600 text-purple-700 px-3 py-2 rounded hover:bg-purple-50 flex justify-center items-center gap-1"
              >
                <FiEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(v)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded flex justify-center items-center gap-1"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl w-full max-w-lg p-6 relative"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-gray-600"
            >
              <FiX size={18} />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editing ? "Edit Venue" : "Add Venue"}
            </h2>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Venue Name"
              className="w-full border p-2 mb-3 rounded"
              required
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border p-2 mb-3 rounded"
              required
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              name="capacity"
              type="number"
              value={form.capacity}
              onChange={handleChange}
              placeholder="Capacity"
              className="w-full border p-2 mb-3 rounded"
              required
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 mb-4 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg">
              {editing ? "Update Venue" : "Create Venue"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}