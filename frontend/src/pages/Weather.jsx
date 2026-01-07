import { useEffect, useState } from "react";

export default function Weather() {

  /* ===== EXISTING STATE (kept) ===== */
  const [forecast, setForecast] = useState([
    { day: "Mon", icon: "☀️", temp: "31°C" },
    { day: "Tue", icon: "⛅", temp: "29°C" },
    { day: "Wed", icon: "🌧️", temp: "26°C" },
    { day: "Thu", icon: "☀️", temp: "31°C" },
    { day: "Fri", icon: "⛅", temp: "30°C" },
    { day: "Sat", icon: "☀️", temp: "32°C" },
    { day: "Sun", icon: "⛅", temp: "28°C" },
  ]);

  /* ===== ADDED STATE (logic only) ===== */
  const [liveForecast, setLiveForecast] = useState([]);

  /* ===== LIVE 7-DAY FORECAST (ADDED) ===== */
  useEffect(() => {
    const API_KEY = "db2c3149526291fc6c6f2ea52d84dd03"; // 🔑 add your key
    const CITY = "Bangalore";

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.list) return;

        const daily = data.list.filter((_, i) => i % 8 === 0).slice(0, 7);

        const mapped = daily.map((d) => ({
          day: new Date(d.dt_txt).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          icon:
            d.weather[0].main === "Rain"
              ? "🌧️"
              : d.weather[0].main === "Clouds"
              ? "⛅"
              : "☀️",
          temp: `${Math.round(d.main.temp)}°C`,
        }));

        /* 🔁 REPLACE STATIC DATA WITH LIVE DATA */
        setForecast(mapped);
      });
  }, []);

  /* ===== UI (100% SAME AS YOUR ORIGINAL) ===== */

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-xl font-semibold mb-6">
        Weather Monitoring
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <p className="text-sm text-gray-500">Temperature</p>
          <h2 className="text-2xl font-bold mt-2">28</h2>
          <p className="text-xs text-gray-400">°C</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <p className="text-sm text-gray-500">Humidity</p>
          <h2 className="text-2xl font-bold mt-2">65</h2>
          <p className="text-xs text-gray-400">%</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <p className="text-sm text-gray-500">Wind Speed</p>
          <h2 className="text-2xl font-bold mt-2">12</h2>
          <p className="text-xs text-gray-400">km/h</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <p className="text-sm text-gray-500">Rainfall</p>
          <h2 className="text-2xl font-bold mt-2">5</h2>
          <p className="text-xs text-gray-400">mm</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">
        7-Day Forecast
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm text-center"
          >
            <p className="text-sm font-medium mb-2">{day.day}</p>
            <div className="text-2xl mb-2">{day.icon}</div>
            <p className="text-sm text-gray-600">{day.temp}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
