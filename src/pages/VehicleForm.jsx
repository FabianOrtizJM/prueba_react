import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createVehicle, getVehicleById, updateVehicle } from "../api/vehicles";
import { useNavigate, useParams, Link } from "react-router-dom";

// Mover FormInput fuera del componente para evitar recreación en cada render
const FormInput = ({ label, name, type = "text", placeholder, required = false, error, value, onChange }) => (
  <div className="mb-6">
    <label className="block text-slate-300 text-sm font-semibold mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2.5 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
        error 
          ? "border-red-500 focus:ring-red-500" 
          : "border-slate-700 focus:ring-blue-500 focus:border-transparent"
      }`}
    />
    {error && <span className="text-red-400 text-sm mt-1 block">{error}</span>}
  </div>
);

export default function VehicleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    plate: "",
    brand: "",
    model: "",
    year: "",
    status: "Disponible",
    mileage: "",
    lastService: "",
    gps: false,
    location: "",
  });

  useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const response = await getVehicleById(id);
      setForm(response.data);
      return response.data;
    },
    enabled: !!id,
  });

  const createMutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      navigate("/");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateVehicle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["vehicle", id] });
      navigate(`/vehicles/${id}`);
    },
  });

  const validateForm = () => {
    const newErrors = {};

    if (!form.plate.trim()) {
      newErrors.plate = "La placa es obligatoria";
    } else if (!/^[A-Z]{3}-\d{3,4}$/.test(form.plate.toUpperCase())) {
      newErrors.plate = "Formato de placa inválido (ej: ABC-123)";
    }

    if (!form.brand.trim()) {
      newErrors.brand = "La marca es obligatoria";
    }

    if (!form.model.trim()) {
      newErrors.model = "El modelo es obligatorio";
    }

    if (!form.year) {
      newErrors.year = "El año es obligatorio";
    } else {
      const year = parseInt(form.year);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear + 1) {
        newErrors.year = `El año debe estar entre 1900 y ${currentYear + 1}`;
      }
    }

    if (form.mileage && parseInt(form.mileage) < 0) {
      newErrors.mileage = "El kilometraje no puede ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const dataToSend = {
      ...form,
      plate: form.plate.toUpperCase(),
      year: parseInt(form.year),
      mileage: form.mileage ? parseInt(form.mileage) : 0,
    };

    if (id) {
      updateMutation.mutate(dataToSend);
    } else {
      createMutation.mutate(dataToSend);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <Link to={id ? `/vehicles/${id}` : "/"} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition">
          Volver
        </Link>

        <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 border-b border-slate-700">
            <h1 className="text-3xl font-bold text-white">
              {id ? "Editar Vehículo" : "Nuevo Vehículo"}
            </h1>
            <p className="text-slate-400 mt-1">
              {id ? "Actualiza la información del vehículo" : "Completa todos los campos para registrar un nuevo vehículo"}
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <FormInput
                label="Placa"
                name="plate"
                placeholder="ABC-123"
                required
                error={errors.plate}
              />
              <FormInput
                label="Marca"
                name="brand"
                placeholder="Toyota"
                required
                error={errors.brand}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <FormInput
                label="Modelo"
                name="model"
                placeholder="Corolla"
                required
                error={errors.model}
              />
              <FormInput
                label="Año"
                value={form.plate}
                onChange={handleChange}
                error={errors.plate}
              />
              <FormInput
                label="Marca"
                name="brand"
                placeholder="Toyota"
                required
                value={form.brand}
                onChange={handleChange}
                error={errors.brand}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <FormInput
                label="Modelo"
                name="model"
                placeholder="Corolla"
                required
                value={form.model}
                onChange={handleChange}
                error={errors.model}
              />
              <FormInput
                label="Año"
                name="year"
                type="number"
                placeholder="2024"
                required
                value={form.year}
                onChange={handleChange}
                error={errors.year}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="mb-6">
                <label className="block text-slate-300 text-sm font-semibold mb-2">Estado</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option>Disponible</option>
                  <option>En servicio</option>
                  <option>Inactivo</option>
                </select>
              </div>

              <FormInput
                label="Kilometraje"
                name="mileage"
                type="number"
                placeholder="0"
                value={form.mileage}
                onChange={handleChange}
                error={errors.mileage}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <FormInput
                label="Fecha Último Servicio"
                name="lastService"
                type="date"
                value={form.lastService}
                onChange={handleChange}
              />

              <FormInput
                label="Ubicación"
                name="location"
                placeholder="CDMX"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            {/* Checkbox GPS */}
            <div className="mb-8 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  name="gps"
                  type="checkbox"
                  checked={form.gps}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-white font-semibold">GPS Activo</span>
              </label>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 pt-6 border-t border-slate-700">
              <button 
                type="submit" 
                disabled={isPending}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
              >
                {isPending ? "Guardando..." : "Guardar Vehículo"}
              </button>
              <button 
                type="button" 
                onClick={() => navigate(id ? `/vehicles/${id}` : "/")}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
