import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh.js";

function App() {
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    "Loading..."
  ) : (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/authenticate"
          element={<GuestRoute children={<Authenticate />} />}
        />
        <Route
          path="/activate"
          element={<SemiProtectedRoute children={<Activate />} />}
        />
        <Route
          path="/rooms"
          element={<ProtectedRoute children={<Rooms />} />}
        />

        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Navigate to="/rooms" /> : children;
};

const SemiProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" />
  ) : !user.activate ? (
    children
  ) : (
    <Navigate to="/rooms" />
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" />
  ) : !user.activated ? (
    <Navigate to="/activate" />
  ) : (
    children
  );
};
export default App;
