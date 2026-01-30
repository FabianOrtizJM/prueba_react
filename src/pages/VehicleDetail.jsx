import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getVehicleById, deleteVehicle, updateVehicle } from "../api/vehicles";

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: vehicle, isLoading, error } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const response = await getVehicleById(id);
      return response.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus) => updateVehicle(id, { ...vehicle, status: newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle", id] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      navigate("/");
    },
  });

  if (isLoading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="animate-spin inline-block w-8 h-8 border-4 border-slate-600 border-t-blue-500 rounded-full"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-red-400 text-lg">Error: {error.message}</div>
    </div>
  );

  if (!vehicle) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-slate-400 text-lg">Vehículo no encontrado</div>
    </div>
  );

  const handleStatusChange = (e) => {
    updateStatusMutation.mutate(e.target.value);
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de eliminar este vehículo? Esta acción no se puede deshacer.")) {
      deleteMutation.mutate();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Disponible":
        return "bg-green-900/30 border-green-700 text-green-300";
      case "En servicio":
        return "bg-amber-900/30 border-amber-700 text-amber-300";
      case "Inactivo":
        return "bg-slate-700/30 border-slate-600 text-slate-300";
      default:
        return "bg-slate-700/30 border-slate-600 text-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition">
          Volver al listado
        </Link>

        <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 border-b border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{vehicle.brand} {vehicle.model}</h1>
                <p className="text-slate-400 text-lg">Placa: <span className="font-mono font-semibold text-blue-400">{vehicle.plate}</span></p>
              </div>
              <div className={`px-6 py-3 rounded-lg border-2 font-bold text-lg ${getStatusColor(vehicle.status)}`}>
                {vehicle.status}
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                <p className="text-slate-400 text-sm font-semibold mb-1">Año de Fabricación</p>
                <p className="text-2xl font-bold text-white">{vehicle.year}</p>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                <p className="text-slate-400 text-sm font-semibold mb-1">Kilometraje</p>
                <p className="text-2xl font-bold text-white">{vehicle.mileage?.toLocaleString() || "N/A"} <span className="text-sm text-slate-400">km</span></p>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                <p className="text-slate-400 text-sm font-semibold mb-1">Último Servicio</p>
                <p className="text-xl font-bold text-white">{vehicle.lastService || "Sin registro"}</p>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                <p className="text-slate-400 text-sm font-semibold mb-1">Ubicación</p>
                <p className="text-xl font-bold text-white">{vehicle.location || "N/A"}</p>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600 mb-8">
              <p className="text-slate-400 text-sm font-semibold mb-3">Estado del Sistema</p>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${vehicle.gps ? "bg-green-500" : "bg-red-500"} animate-pulse`}></div>
                <span className="text-white font-semibold">{vehicle.gps ? "GPS Activo" : "GPS Inactivo"}</span>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600 mb-8">
              <label className="block text-slate-300 text-sm font-semibold mb-3">Cambiar Estado</label>
              <div className="flex gap-4">
                <select 
                  value={vehicle.status} 
                  onChange={handleStatusChange}
                  disabled={updateStatusMutation.isPending}
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer">
                  <option>Disponible</option>
                  <option>En servicio</option>
                  <option>Inactivo</option>
                </select>
                {updateStatusMutation.isPending && (
                  <span className="text-blue-400 font-semibold">Actualizando...</span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Link to={`/vehicles/${id}/edit`} className="flex-1">
                <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  Editar Vehículo
                </button>
              </Link>
              <button 
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition">
                {deleteMutation.isPending ? "Eliminando..." : "Eliminar Vehículo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
