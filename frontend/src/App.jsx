import { useState } from "react";
import Home from "./pages/Home";
import Crops from "./pages/Crops";
import Farmers from "./pages/Farmers";
import Weather from "./pages/Weather";
import Analysis from "./pages/Analysis";

const API_BASE = "https://agrimap-backend.onrender.com";

/* ================= LOGIN (UNCHANGED) ================= */
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/login`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      onLogin({ email: data.email, role: data.role });
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white w-[420px] rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-800">AgriMap</h1>
          <p className="text-sm text-gray-500">
            Smart Agriculture Platform
          </p>
        </div>

        <h2 className="text-lg font-semibold mb-4">Login</h2>

        <form onSubmit={submit}>
          <input
            className="w-full border px-4 py-3 rounded-lg mb-4"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border px-4 py-3 rounded-lg mb-5"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <span className="text-green-700 font-semibold cursor-pointer">
            Register
          </span>
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 text-sm">
          <p className="font-semibold text-blue-700 mb-1">
            Demo Credentials:
          </p>
          <p>Admin: admin@agrimap.com</p>
          <p>User: user@agrimap.com</p>
          <p>Password: any</p>
        </div>
      </div>
    </div>
  );
};
/* ================= END LOGIN ================= */

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  /* IF NOT LOGGED IN */
  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="bg-green-50 min-h-screen">

      {/* ================= NAVBAR ================= */}
      <header className="bg-green-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-lg">🌾 AgriMap</div>

        <nav className="flex gap-6 text-sm">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("crops")}>Crop Data</button>
          <button onClick={() => setPage("farmers")}>Farmer Info</button>
          <button onClick={() => setPage("weather")}>Weather</button>
          <button onClick={() => setPage("analysis")}>Analysis</button>
        </nav>

        <button
          onClick={() => setUser(null)}
          className="bg-red-500 px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </header>
      {/* ================= END NAVBAR ================= */}

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {page === "home" && <Home />}
        {page === "crops" && <Crops user={user} />}
        {page === "farmers" && <Farmers user={user} />}
        {page === "weather" && <Weather />}
        {page === "analysis" && <Analysis />}
      </main>
      {/* ================= END MAIN ================= */}

    </div>
  );
}
