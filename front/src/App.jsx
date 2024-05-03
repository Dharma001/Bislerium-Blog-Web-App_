import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminDashboard from "./pages/Admin/AdminDashboard";

import UserDashboard from "./pages/Users/UserDashboard";
import AdminLayout from "./pages/Admin/Layouts/AdminLayout";
import CreatePost from "./components/CreatePost";
import RoleIndex from "./pages/Admin/Role/Index";
import UserIndex from "./pages/Admin/User/Index";
import UserCreate from "./pages/Admin/User/Create";
import UserEdit from "./pages/Admin/User/Edit";
import RoleCreate from "./pages/Admin/Role/Create";
import RoleEdit from "./pages/Admin/Role/Edit";
import HomePageLayout from "./pages/Home/Layouts/HomePageLayout";
import Post from "./pages/Home/Post";
import UserProfile from "./pages/Users/Profile/UserProfile";
import ProfileLayouts from "./pages/Users/Layouts/ProfileLayouts";
import UserUpdateLayouts from "./pages/Users/Layouts/UserUpdateLayouts";
import PostHistory from "./pages/Users/PostHistory";
import CommentHistory from "./pages/Users/CommentHistory";
import ChangePassword from "./pages/Users/ChangePassword";

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
        <Route path="/" element={<HomePageLayout />}>
          <Route path="/" element={<Post />} />
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
        </Route>
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
          <Route
            path="createRole"
            element={
              <PrivateAdminRoute
                element={<RoleCreate />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="editRole/:id"
            element={
              <PrivateAdminRoute
                element={<RoleEdit />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />

          <Route
            path="roleList"
            element={
              <PrivateAdminRoute
                element={<RoleIndex />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />

          <Route
            path="createUser"
            element={
              <PrivateAdminRoute
                element={<UserCreate />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="editUser/:id"
            element={
              <PrivateAdminRoute
                element={<UserEdit />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />

          <Route
            path="userList"
            element={
              <PrivateAdminRoute
                element={<UserIndex />}
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
        <Route path="/" element={<HomePageLayout />}>
          <Route
            path="createPost"
            element={
              <PrivateUserRoute
                element={<CreatePost />}
                authenticated={isAuthenticated()}
                isAuthUser={isAuthUser()}
                redirectTo="/login"
              />
            }
          />
        <Route path="/profile" element={<ProfileLayouts />}>
        <Route
            path="userProfile"
            element={
              <PrivateUserRoute
                element={<UserProfile />}
                authenticated={isAuthenticated()}
                isAuthUser={isAuthUser()}
                redirectTo="/login"
              />
            }
          />
        <Route
            path="changePassword"
            element={
              <PrivateUserRoute
                element={<ChangePassword />}
                authenticated={isAuthenticated()}
                isAuthUser={isAuthUser()}
                redirectTo="/login"
              />
            }
          />
        </Route>
        
        <Route path="/history" element={<UserUpdateLayouts />}>
        <Route
            path="postHistory"
            element={
              <PrivateUserRoute
                element={<PostHistory />}
                authenticated={isAuthenticated()}
                isAuthUser={isAuthUser()}
                redirectTo="/login"
              />
            }
          />
                  <Route
            path="commentHistory"
            element={
              <PrivateUserRoute
                element={<CommentHistory />}
                authenticated={isAuthenticated()}
                isAuthUser={isAuthUser()}
                redirectTo="/login"
              />
            }
          />
        </Route>
        </Route>
      </Routes>

    </>
  );
}

export default App;
