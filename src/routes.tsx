import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainAppPage from "./pages/MainAppPage";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import NotFoundPage from "./pages/NotFound404";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/authContext";

function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<AuthLayout />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/*" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="image-gen"
              element={
                <ProtectedRoute>
                  <MainAppPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;
