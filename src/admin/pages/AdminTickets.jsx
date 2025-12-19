import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  const initialForm = { eventName: "", category: "", price: "", stock: "" };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const res = await api.get("/tickets");
      setTickets(res.data || []);
    } catch (err) {
      toast.error("Failed to load tickets");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAdd = () => {
    setEditingTicket(null);
    setForm(initialForm);
    setOpenModal(true);
  };

  const openEdit = (ticket) => {
    setEditingTicket(ticket);
    setForm({
      eventName: ticket.eventName,
      category: ticket.category,
      price: ticket.price,
      stock: ticket.stock,
    });
    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTicket) {
        await api.put(`/tickets/${editingTicket.id}`, form);
        toast.success("Ticket updated");
      } else {
        await api.post("/tickets", form);
        toast.success("Ticket created");
      }
      setOpenModal(false);
      loadTickets();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const deleteTicket = async (id) => {
    if (!window.confirm("Delete this ticket?")) return;
    try {
      await api.delete(`/tickets/${id}`);
      toast.success("Ticket deleted");
      loadTickets();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      {" "}
      <div className="flex justify-between items-center mb-6">
        {" "}
        <h1 className="text-2xl font-bold">Ticket Management</h1>{" "}
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          {" "}
          <FiPlus /> Add Ticket{" "}
        </button>{" "}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((t) => (
          <div key={t.id} className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold">{t.eventName}</h3>
            <p className="text-sm text-gray-600">Category: {t.category}</p>

            <div className="flex justify-between mt-3">
              <span className="font-semibold">₹{t.price}</span>
              <span className="text-sm">Stock: {t.stock}</span>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEdit(t)}
                className="flex-1 flex items-center justify-center gap-2 border border-purple-600 text-purple-700 py-2 rounded"
              >
                <FiEdit /> Edit
              </button>

              <button
                onClick={() => deleteTicket(t.id)}
                className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4"
            >
              <FiX size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editingTicket ? "Edit Ticket" : "Add Ticket"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="eventName"
                placeholder="Event Name"
                value={form.eventName}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                name="price"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                name="stock"
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-700 text-white px-4 py-2 rounded"
                >
                  {editingTicket ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
