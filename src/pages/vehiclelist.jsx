import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getVehicles } from "../api/vehicles";
import VehicleTable from "../components/VehicleTable";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import Pagination from "../components/Pagination";

export default function VehicleList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["vehicles", page, search, statusFilter],
    queryFn: async () => {
      const params = {
        _page: page,
        _limit: 10,
      };
      
      if (search) {
        params.q = search;
      }
      
      if (statusFilter) {
        params.status = statusFilter;
      }

      const response = await getVehicles(params);
      const total = response.headers['x-total-count'] || response.headers['X-Total-Count'];
      
      return {
        vehicles: response.data,
        total: total ? parseInt(total) : response.data.length
      };
    },
    staleTime: 30000,
    gcTime: 300000,
  });

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const itemsPerPage = 10;
  const totalItems = data?.total || 0;
  const hasMore = (page * itemsPerPage) < totalItems;

  if (error) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center pt-20">
      <div className="text-red-400 text-lg">Error al cargar vehículos: {error.message}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Gestión de Vehículos</h1>
            <p className="text-slate-400">FleetTracker - Sistema de Control de Flotas</p>
          </div>
          <Link to="/vehicles/new">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition flex items-center gap-2">
              Nuevo Vehículo
            </button>
          </Link>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <label className="block text-slate-300 text-sm font-semibold mb-2">Búsqueda</label>
            <SearchBar value={search} onChange={handleSearchChange} />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">Filtrar por Estado</label>
            <StatusFilter value={statusFilter} onChange={handleStatusChange} />
          </div>
        </div>

        {/* Tabla */}
        <div className="mb-6">
          {isLoading ? (
            <div className="bg-slate-800 rounded-lg p-12 text-center">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-slate-600 border-t-blue-500 rounded-full"></div>
              <p className="text-slate-400 mt-4">Cargando vehículos...</p>
            </div>
          ) : data?.vehicles && data.vehicles.length > 0 ? (
            <>
              <div className="bg-slate-800 rounded-lg p-4 mb-4">
                <p className="text-slate-300 text-sm">
                  Mostrando <span className="font-semibold">{data.vehicles.length}</span> de <span className="font-semibold">{totalItems}</span> vehículos
                </p>
              </div>
              <VehicleTable vehicles={data.vehicles} />
            </>
          ) : (
            <div className="bg-slate-800 rounded-lg p-12 text-center">
              <p className="text-slate-400 text-lg">No se encontraron vehículos</p>
              <p className="text-slate-500 text-sm mt-2">Intenta con otros filtros o crea uno nuevo</p>
            </div>
          )}
        </div>

        {/* Paginación */}
        {data?.vehicles && data.vehicles.length > 0 && (
          <Pagination page={page} setPage={setPage} hasMore={hasMore} />
        )}
      </div>
    </div>
  );
}
