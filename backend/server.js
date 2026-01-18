const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, "data");
const cropsFile = path.join(dataDir, "crops.json");

/* ---------- LOGIN (UNCHANGED) ---------- */
app.post("/api/login", (req, res) => {
  const { email } = req.body;

  if (email === "admin@agrimap.com") {
    return res.json({ success: true, email, role: "admin" });
  }
  if (email === "user@agrimap.com") {
    return res.json({ success: true, email, role: "user" });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
});

/* ---------- HELPERS ---------- */
const readCrops = () =>
  JSON.parse(fs.readFileSync(cropsFile, "utf-8"));

const writeCrops = (data) =>
  fs.writeFileSync(cropsFile, JSON.stringify(data, null, 2));

/* ---------- GET CROPS (EXISTING + ADMIN) ---------- */
app.get("/api/crops", (req, res) => {
  res.json(readCrops());
});

/* ---------- ADD CROP (ADMIN) ---------- */
app.post("/api/crops", (req, res) => {
  const crops = readCrops();
  const newCrop = { id: Date.now(), ...req.body };
  crops.push(newCrop);
  writeCrops(crops);
  res.json(newCrop);
});

/* ---------- DELETE CROP (ADMIN) ---------- */
app.delete("/api/crops/:id", (req, res) => {
  const crops = readCrops().filter(
    (c) => c.id != req.params.id
  );
  writeCrops(crops);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
