import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../views/pages/admin dashboard";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
