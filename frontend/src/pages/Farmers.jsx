import { useState } from "react";

export default function Farmers({ user }) {

  /* ===== YOUR EXISTING DATA (UNCHANGED) ===== */
  const [farmers, setFarmers] = useState([
    {
      name: "Rajesh Kumar",
      location: "Punjab",
      land: "5 acres",
      crops: "Wheat, Rice",
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra",
      land: "3 acres",
      crops: "Sugarcane, Cotton",
    },
    {
      name: "Amit Verma",
      location: "Uttar Pradesh",
      land: "7 acres",
      crops: "Wheat, Maize",
    },
  ]);

  /* ===== ADDED: ADMIN FORM STATE ===== */
  const [form, setForm] = useState({
    name: "",
    location: "",
    land: "",
    crops: "",
  });

  /* ===== ADDED: ADD FARMER (ADMIN) ===== */
  const addFarmer = () => {
    setFarmers([...farmers, form]);
    setForm({ name: "", location: "", land: "", crops: "" });
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* PAGE TITLE */}
      <h1 className="text-xl font-semibold mb-6">
        Farmer Information
      </h1>

      {/* ===== ADMIN ADD FARMER FORM (ADDED) ===== */}
      {user?.role === "admin" && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="font-semibold mb-4">
            Add Farmer (Admin)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
            <input
              placeholder="Name"
              className="border p-2 rounded"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            <input
              placeholder="Location"
              className="border p-2 rounded"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />
            <input
              placeholder="Land"
              className="border p-2 rounded"
              value={form.land}
              onChange={(e) =>
                setForm({ ...form, land: e.target.value })
              }
            />
            <input
              placeholder="Crops"
              className="border p-2 rounded"
              value={form.crops}
              onChange={(e) =>
                setForm({ ...form, crops: e.target.value })
              }
            />
          </div>

          <button
            onClick={addFarmer}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Farmer
          </button>
        </div>
      )}

      {/* ===== YOUR EXISTING TABLE (UNCHANGED) ===== */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-4 bg-green-700 text-white px-6 py-3 text-sm font-medium">
          <div>Name</div>
          <div>Location</div>
          <div>Land</div>
          <div>Crops</div>
        </div>

        {/* TABLE ROWS */}
        {farmers.map((farmer, index) => (
          <div
            key={index}
            className="grid grid-cols-4 px-6 py-3 text-sm border-b last:border-b-0"
          >
            <div>{farmer.name}</div>
            <div>{farmer.location}</div>
            <div>{farmer.land}</div>
            <div>{farmer.crops}</div>
          </div>
        ))}

      </div>
    </div>
  );
}
