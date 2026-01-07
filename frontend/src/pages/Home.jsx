export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">

      {/* GREEN WELCOME BANNER */}
      <div className="bg-green-700 text-white rounded-2xl px-12 py-12 mb-10">
        <h1 className="text-3xl font-bold mb-3 text-center">
          Welcome to AgriMap
        </h1>

        <p className="text-center text-sm opacity-90 mb-6">
          A smart platform for crop mapping, farmer insights, and agricultural decision support.
        </p>

        <div className="flex justify-center">
          <button className="bg-white text-green-700 px-6 py-2 rounded-lg font-medium">
            Explore Dashboard
          </button>
        </div>
      </div>

      {/* DASHBOARD OVERVIEW */}
      <h2 className="text-lg font-semibold mb-6">
        Dashboard Overview
      </h2>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {/* Crop Mapping */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl mb-3">🌱</div>
          <h3 className="font-semibold mb-2">Crop Mapping</h3>
          <p className="text-sm text-gray-600">
            Visualize crop distribution using interactive maps.
          </p>
        </div>

        {/* Farmer Database */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl mb-3">👨‍🌾</div>
          <h3 className="font-semibold mb-2">Farmer Database</h3>
          <p className="text-sm text-gray-600">
            Store and access farmer profiles and land details.
          </p>
        </div>

        {/* Weather Monitoring */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl mb-3">🌦️</div>
          <h3 className="font-semibold mb-2">Weather Monitoring</h3>
          <p className="text-sm text-gray-600">
            Track real-time weather data for better planning.
          </p>
        </div>

        {/* Data Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-semibold mb-2">Data Insights</h3>
          <p className="text-sm text-gray-600">
            Analyze production trends and predictive reports.
          </p>
        </div>

      </div>
    </div>
  );
}
