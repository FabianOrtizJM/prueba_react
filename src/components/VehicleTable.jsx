import { Link } from "react-router-dom";

export default function VehicleTable({ vehicles }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Disponible":
        return "bg-green-900/50 text-green-300 border border-green-700";
      case "En servicio":
        return "bg-amber-900/50 text-amber-300 border border-amber-700";
      case "Inactivo":
        return "bg-slate-700/50 text-slate-300 border border-slate-600";
      default:
        return "bg-slate-700/50 text-slate-300 border border-slate-600";
    }
  };

  return (
    <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-lg border border-slate-700">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-700 border-b border-slate-600">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Placa</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Marca</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Modelo</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200">Año</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200">Estado</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v, idx) => (
            <tr key={v.id} className={idx % 2 === 0 ? "bg-slate-800" : "bg-slate-750 hover:bg-slate-700/50 transition"}>
              <td className="px-6 py-4 font-semibold text-white">{v.plate}</td>
              <td className="px-6 py-4 text-slate-200">{v.brand}</td>
              <td className="px-6 py-4 text-slate-200">{v.model}</td>
              <td className="px-6 py-4 text-center text-slate-200">{v.year}</td>
              <td className="px-6 py-4 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(v.status)}`}>
                  {v.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <Link to={`/vehicles/${v.id}`}>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition">
                    Ver Detalle
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
