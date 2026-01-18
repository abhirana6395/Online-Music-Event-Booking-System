import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  const initialForm = {
    eventId: "",
    category: "",
    price: "",
    stock: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    loadTickets();
    loadEvents();
  }, []);

  const loadTickets = async () => {
    const res = await api.get("/tickets");
    setTickets(res.data || []);
  };

  const loadEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data || []);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => {
    setEditingTicket(null);
    setForm(initialForm);
    setOpenModal(true);
  };

  const openEdit = (t) => {
    setEditingTicket(t);
    setForm({
      eventId: t.event.id,
      category: t.category,
      price: t.price,
      stock: t.stock,
    });
    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      event: { id: Number(form.eventId) },
    };

    try {
      if (editingTicket) {
        await api.put(`/tickets/${editingTicket.id}`, payload);
        toast.success("Ticket updated");
      } else {
        await api.post("/tickets", payload);
        toast.success("Ticket created");
      }
      setOpenModal(false);
      loadTickets();
    } catch (err) {
      toast.error("Operation failed");
      console.error(err);
    }
  };

  const deleteTicket = async (id) => {
    if (!window.confirm("Delete ticket?")) return;
    await api.delete(`/tickets/${id}`);
    toast.success("Deleted");
    loadTickets();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <button onClick={openAdd} className="bg-purple-700 text-white px-4 py-2 rounded">
          <FiPlus /> Add Ticket
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tickets.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{t.event.title}</h3>
            <p>{t.category}</p>
            <p>₹{t.price}</p>
            <p>Stock: {t.stock}</p>

            <div className="flex gap-2 mt-3">
              <button onClick={() => openEdit(t)} className="border px-3 py-1 rounded">
                <FiEdit />
              </button>
              <button onClick={() => deleteTicket(t.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96">
            <button onClick={() => setOpenModal(false)} className="float-right">
              <FiX />
            </button>

            <select
              name="eventId"
              value={form.eventId}
              onChange={handleChange}
              className="w-full border p-2 mb-3"
              required
            >
              <option value="">Select Event</option>
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
            </select>

            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 mb-3" />
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border p-2 mb-3" />
            <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="w-full border p-2 mb-4" />

            <button className="bg-purple-700 text-white w-full py-2 rounded">
              {editingTicket ? "Update" : "Create"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}