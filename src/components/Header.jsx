import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-slate-800 border-b border-slate-700 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <span className="text-white font-bold text-lg">FT</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white m-0">FleetTracker</h1>
              <p className="text-xs text-slate-400 m-0">Control de Flotas</p>
            </div>
          </Link>

          {/* Navegación */}
          <nav className="flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-medium transition no-underline ${
                isActive("/") 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              Vehículos
            </Link>
            <Link 
              to="/vehicles/new" 
              className={`px-4 py-2 rounded-lg font-medium transition no-underline ${
                isActive("/vehicles/new") 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              Nuevo
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
