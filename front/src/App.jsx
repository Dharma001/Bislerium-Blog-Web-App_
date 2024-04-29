import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import HomePage from "./pages/HomePage";
import UserDashboard from "./pages/Users/UserDashboard";
import AdminLayout from "./pages/Admin/Layouts/AdminLayout";
import CreatePost from "./components/CreatePost";

function isAuthenticated() {
  const token = Cookies.get("token");
  return token !== undefined && token !== null;
}

function isAdmin() {
  const roleId = Cookies.get("roleId");
  return roleId === "1";
}

function isAuthUser() {
  const roleId = Cookies.get("roleId");
  return roleId === "2"; 
}

function PrivateUserRoute({ element, authenticated }) {
  const authUser = isAuthUser();
  return authenticated && authUser ? element : <Navigate to="/login" />;
}

function PrivateAdminRoute({ element, authenticated }) {
  const admin = isAdmin();
  return authenticated && admin ? element : <Navigate to="/login" />;
}

function PrivateRoute({ element, authenticated, redirectTo }) {
  return authenticated ? element : <Navigate to={redirectTo} />;
}

function App() {
  const location = useLocation();
  const authenticated = isAuthenticated();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register"}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route
          path="/login"
          element={
            <PrivateRoute
              element={<Login />}
              authenticated={!authenticated}
              redirectTo="/admin"
            />
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute
              element={<Register />}
              authenticated={!authenticated}
              redirectTo="/admin"
            />
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute
              element={<AdminLayout />}
              authenticated={isAuthenticated()}
              isAdmin={isAdmin()}
              redirectTo="/login"
            />
          }
        >
                    <Route
            path="dashboard"
            element={
              <PrivateAdminRoute
                element={<AdminDashboard />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
        </Route>
        <Route
          path="/user"
          element={
            <PrivateUserRoute
              element={<UserDashboard />}
              authenticated={authenticated}
            />
          }
        />
      </Routes>
      
    </>
  );
}

export default App;
