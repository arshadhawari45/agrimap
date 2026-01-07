import { useEffect, useState } from "react";

export default function Analysis() {
  const [crops, setCrops] = useState([]);

  /* FETCH YOUR EXISTING CROP DATA */
  useEffect(() => {
    fetch("http://localhost:4000/api/crops")
      .then((res) => res.json())
      .then(setCrops);
  }, []);

  /* ================= DATA CALCULATIONS ================= */

  const totalCrops = crops.length;

  const seasonCount = {};
  const waterCount = {};        // ✅ ADDED
  const regionCount = {};       // ✅ ADDED
  const soilSet = new Set();

  crops.forEach((crop) => {
    // season count
    seasonCount[crop.season] = (seasonCount[crop.season] || 0) + 1;

    // water requirement count ✅
    waterCount[crop.water] = (waterCount[crop.water] || 0) + 1;

    // region count ✅
    regionCount[crop.region] = (regionCount[crop.region] || 0) + 1;

    // soil types count
    if (crop.soil) {
      crop.soil.split(",").forEach((s) => soilSet.add(s.trim()));
    }
  });

  const seasonData = Object.entries(seasonCount).map(
    ([name, count]) => ({
      name,
      value: Math.round((count / totalCrops) * 100),
    })
  );

  const waterData = Object.entries(waterCount).map(      // ✅ ADDED
    ([name, count]) => ({
      name,
      value: Math.round((count / totalCrops) * 100),
    })
  );

  const regionData = Object.entries(regionCount).map(    // ✅ ADDED
    ([name, count]) => ({
      name,
      value: Math.round((count / totalCrops) * 100),
    })
  );

  const activeSeasons = Object.keys(seasonCount).length;
  const soilTypes = soilSet.size;

  /* ================= UI (UNCHANGED + EXTENDED) ================= */

  return (
    <div className="max-w-7xl mx-auto">

      {/* PAGE TITLE */}
      <h1 className="text-xl font-semibold mb-6">
        Data Analysis
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="text-3xl mb-2">📊</div>
          <p className="text-sm text-gray-500">Total Crops</p>
          <h2 className="text-2xl font-bold mt-1">
            {totalCrops}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="text-3xl mb-2">🌱</div>
          <p className="text-sm text-gray-500">Active Seasons</p>
          <h2 className="text-2xl font-bold mt-1">
            {activeSeasons}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="text-3xl mb-2">🌍</div>
          <p className="text-sm text-gray-500">Soil Types</p>
          <h2 className="text-2xl font-bold mt-1">
            {soilTypes}
          </h2>
        </div>

      </div>

      {/* CROP DISTRIBUTION BY SEASON (ORIGINAL) */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Crop Distribution by Season
        </h2>

        {seasonData.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-700 h-3 rounded-full"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ✅ WATER REQUIREMENT DISTRIBUTION (ADDED) */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Water Requirement Distribution
        </h2>

        {waterData.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ✅ REGION-WISE DISTRIBUTION (ADDED) */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Region-wise Crop Distribution
        </h2>

        {regionData.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-purple-600 h-3 rounded-full"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
