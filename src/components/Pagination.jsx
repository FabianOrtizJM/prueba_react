export default function Pagination({ page, setPage, hasMore = true }) {
  return (
    <div className="flex justify-center items-center gap-4 py-6">
      <button 
        disabled={page === 1} 
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
      >
        Anterior
      </button>
      <span className="font-semibold text-white min-w-[120px] text-center">
        Página {page}
      </span>
      <button 
        disabled={!hasMore} 
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
      >
        Siguiente
      </button>
    </div>
  );
}
