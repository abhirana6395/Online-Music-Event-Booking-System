import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import api from "../../utils/api";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await api.get("/admin/dashboard");
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-lg text-gray-500">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="text-lg text-gray-500">No data available</div>;
  }

  return (
    <div className="space-y-8">
      {/* ====== TOP CARDS ====== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹ ${data.totalRevenue}`}
          color="from-purple-600 to-indigo-600"
        />
        <StatCard
          title="Tickets Sold"
          value={data.totalTicketsSold}
          color="from-pink-600 to-rose-600"
        />
        <StatCard
          title="Total Events"
          value={data.totalEvents}
          color="from-emerald-600 to-green-600"
        />
        <StatCard
          title="Active Users"
          value={data.activeUsers || 0}
          color="from-sky-600 to-blue-600"
        />
      </div>

      {/* ====== REVENUE CHART ====== */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Revenue Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ====== CARD COMPONENT ====== */
function StatCard({ title, value, color }) {
  return (
    <div
      className={`rounded-2xl p-5 text-white bg-gradient-to-r ${color} shadow-lg`}
    >
      <div className="text-sm opacity-90">{title}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  );
}
