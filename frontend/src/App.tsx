import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import ForgotPasswordPage from "./ForgotPasswordPage";
import RegisterPage from "./RegisterPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
