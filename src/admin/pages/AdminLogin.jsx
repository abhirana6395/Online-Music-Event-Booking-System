export default function AdminLogin() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#1a103d]">
      <div className="bg-white p-8 w-96 rounded-xl shadow-xl animate-fadeIn">
        <h2 className="text-center text-2xl font-bold mb-6">Admin Login</h2>

        <input
          className="w-full p-3 border rounded mb-4"
          placeholder="Admin Email"
        />

        <input
          className="w-full p-3 border rounded mb-4"
          placeholder="Password"
          type="password"
        />

        <button className="w-full bg-[#1a103d] text-white p-3 rounded">
          Login
        </button>
      </div>
    </div>
  );
}
