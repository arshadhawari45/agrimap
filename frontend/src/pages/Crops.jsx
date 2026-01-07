import { useEffect, useState } from "react";

export default function Crops({ user }) {
  const [crops, setCrops] = useState([]);
  const [form, setForm] = useState({
    name: "",
    season: "",
    soil: "",
    water: "",
    region: "",
  });

  /* LOAD CROPS */
  useEffect(() => {
    fetch("http://localhost:4000/api/crops")
      .then((res) => res.json())
      .then(setCrops);
  }, []);

  /* ADD CROP (ADMIN) */
  const addCrop = async () => {
    const res = await fetch("http://localhost:4000/api/crops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newCrop = await res.json();
    setCrops([...crops, newCrop]);
  };

  /* DELETE CROP (ADMIN) */
  const deleteCrop = async (id) => {
    await fetch(`http://localhost:4000/api/crops/${id}`, {
      method: "DELETE",
    });
    setCrops(crops.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-xl font-semibold mb-6">
        Crop Data
      </h1>

      {/* ---------- ADMIN ADD FORM ---------- */}
      {user?.role === "admin" && (
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <h2 className="font-semibold mb-3">Add Crop (Admin)</h2>

          {Object.keys(form).map((key) => (
            <input
              key={key}
              placeholder={key}
              className="border p-2 mr-2 mb-2"
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
            />
          ))}

          <button
            onClick={addCrop}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Crop
          </button>
        </div>
      )}

      {/* ---------- CROP CARDS (UNCHANGED STYLE) ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h2 className="font-semibold mb-3">
              🌾 {crop.name}
            </h2>

            <p className="text-sm mb-1">
              <span className="font-medium">Season:</span> {crop.season}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Soil Type:</span> {crop.soil}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Water Requirement:</span>{" "}
              {crop.water}
            </p>
            <p className="text-sm">
              <span className="font-medium">Region:</span> {crop.region}
            </p>

            {/* ADMIN DELETE */}
            {user?.role === "admin" && (
              <button
                onClick={() => deleteCrop(crop.id)}
                className="mt-3 text-red-600 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
