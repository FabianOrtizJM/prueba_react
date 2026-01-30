import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import VehicleList from "../pages/vehiclelist";
import VehicleDetail from "../pages/VehicleDetail";
import VehicleForm from "../pages/VehicleForm";

export default function AppRouter() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<VehicleList />} />
          <Route path="/vehicles/new" element={<VehicleForm />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/vehicles/:id/edit" element={<VehicleForm />} />
        </Routes>
      </main>
    </>
  );
}
