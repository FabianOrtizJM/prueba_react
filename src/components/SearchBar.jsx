export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar por placa, marca o modelo..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    />
  );
}
