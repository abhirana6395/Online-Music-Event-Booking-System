import React, { useEffect, useMemo, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiPlus, FiEdit, FiTrash2, FiX, FiDownload } from "react-icons/fi";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // filter + pagination
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const empty = {
    title: "",
    content: "",
    author: "",
    status: "active",
    imageFile: null,
    imagePreview: ""
  };

  const [form, setForm] = useState(empty);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data || []);
    } catch {
      toast.error("Failed to load blogs");
    }
  }

  // ===== FILTER =====
  const filteredBlogs = useMemo(() => {
    if (status === "all") return blogs;
    return blogs.filter(b => b.status === status);
  }, [blogs, status]);

  // ===== PAGINATION =====
  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / PAGE_SIZE));

  const pagedBlogs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredBlogs.slice(start, start + PAGE_SIZE);
  }, [filteredBlogs, page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  // ===== CSV EXPORT =====
  function exportCSV() {
    if (!filteredBlogs.length) return toast("No data to export");

    const headers = ["Title", "Author", "Status", "Content"];
    const rows = filteredBlogs.map(b => [
      b.title || "",
      b.author || "",
      b.status || "",
      (b.content || "").replace(/\n/g, " ")
    ]);

    const csv = [headers, ...rows]
      .map(r =>
        r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "blogs.csv";
    link.click();

    toast.success("CSV exported");
  }

  // ===== CRUD =====
  function openAdd() {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  }

  function openEdit(b) {
    setEditing(b);
    setForm({
      title: b.title || "",
      content: b.content || "",
      author: b.author || "",
      status: b.status || "active",
      imageFile: null,
      imagePreview: b.imageUrl || ""
    });
    setOpen(true);
  }

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function imageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setForm(f => ({
      ...f,
      imageFile: file,
      imagePreview: URL.createObjectURL(file)
    }));
  }

  async function submit(e) {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("content", form.content);
    fd.append("author", form.author);
    fd.append("status", form.status);
    if (form.imageFile) fd.append("imageFile", form.imageFile);

    try {
      if (editing) {
        await api.put(`/blogs/${editing.id}`, fd);
        toast.success("Blog updated");
      } else {
        await api.post("/blogs", fd);
        toast.success("Blog created");
      }

      setOpen(false);
      setForm(empty);
      loadBlogs();
    } catch {
      toast.error("Operation failed");
    }
  }

  async function remove(b) {
    if (!window.confirm("Delete blog?")) return;

    try {
      await api.delete(`/blogs/${b.id}`);
      toast.success("Deleted");
      loadBlogs();
    } catch {
      toast.error("Delete failed");
    }
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>

        <div className="flex gap-3">
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="border px-3 py-2 rounded"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 border px-4 py-2 rounded"
          >
            <FiDownload /> Export CSV
          </button>

          <button
            onClick={openAdd}
            className="bg-purple-700 text-white px-4 py-2 rounded flex gap-2"
          >
            <FiPlus /> Add Blog
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {pagedBlogs.map(b => (
          <div key={b.id} className="bg-white rounded shadow p-4">
            <img
              src={b.imageUrl || "https://via.placeholder.com/400x200"}
              className="h-40 w-full object-cover rounded mb-3"
              alt=""
            />
            <h3 className="font-semibold">{b.title}</h3>
            <p className="text-sm text-gray-600">{b.author}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEdit(b)}
                className="border px-3 py-1 rounded"
              >
                <FiEdit />
              </button>

              <button
                onClick={() => remove(b)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page <strong>{page}</strong> / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={submit}
            className="bg-white p-6 rounded w-full max-w-xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="float-right"
            >
              <FiX />
            </button>

            <input
              name="title"
              value={form.title}
              onChange={change}
              placeholder="Title"
              className="w-full border p-2 mb-3"
            />

            <input
              name="author"
              value={form.author}
              onChange={change}
              placeholder="Author"
              className="w-full border p-2 mb-3"
            />

            <textarea
              name="content"
              value={form.content}
              onChange={change}
              placeholder="Content"
              rows="4"
              className="w-full border p-2 mb-3"
            />

            <input type="file" onChange={imageChange} className="mb-3" />

            {form.imagePreview && (
              <img
                src={form.imagePreview}
                className="h-32 w-full object-cover rounded mb-3"
                alt=""
              />
            )}

            <select
              name="status"
              value={form.status}
              onChange={change}
              className="w-full border p-2 mb-4"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button className="bg-purple-700 text-white w-full py-2 rounded">
              {editing ? "Update" : "Create"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}