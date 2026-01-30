export default function StatusFilter({ value, onChange }) {
  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition"
    >
      <option value="">Todos los estados</option>
      <option value="Disponible">Disponible</option>
      <option value="En servicio">En servicio</option>
      <option value="Inactivo">Inactivo</option>
    </select>
  );
}
