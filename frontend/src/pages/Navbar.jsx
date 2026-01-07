export default function Navbar({ page, setPage, onLogout }) {
  const link = p =>
    `cursor-pointer ${page === p ? "font-bold underline" : ""}`;

  return (
    <header className="bg-green-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">🌾 AgriMap</h1>

      <nav className="flex gap-6 text-sm">
        <span className={link("home")} onClick={() => setPage("home")}>
          Home
        </span>
        <span className={link("crops")} onClick={() => setPage("crops")}>
          Crop Data
        </span>
        <span className={link("farmers")} onClick={() => setPage("farmers")}>
          Farmer Info
        </span>
        <span className={link("weather")} onClick={() => setPage("weather")}>
          Weather
        </span>
        <span className={link("analysis")} onClick={() => setPage("analysis")}>
          Analysis
        </span>
      </nav>

      <button
        onClick={onLogout}
        className="bg-red-500 px-4 py-1 rounded-lg text-sm"
      >
        Logout
      </button>
    </header>
  );
}
