import "./App.css";
import Mockman from "mockman-js";
import "react-toastify/dist/ReactToastify.min.css";
import { Routes, Route } from "react-router-dom";
import { Header, Sidebar, Search, Filter } from "./components/index";
import { Home, Login, SignUp, Trash, Archives, Label } from "./pages/index";
import { RequiresAuth } from "./pages/auth/components/RequiresAuth";
import { useAuth } from "./context/auth-context";
import { ToastContainer } from "react-toastify";
import { ErrorPage } from "./pages/error/ErrorPage";

function App() {
  const { token } = useAuth();
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={700} draggable />
      {token && <Header />}
      <div className="d-flex">
        <div>{token && <Sidebar />}</div>
        <div className="page-content">
          {token && (
            <div>
              <Search />
              <Filter />
            </div>
          )}
          <Routes>
            <Route path="/mockman" element={<Mockman />} />
            <Route
              path="/"
              element={
                <RequiresAuth>
                  <Home />
                </RequiresAuth>
              }
            />
            <Route
              path="/label/:label"
              element={
                <RequiresAuth>
                  <Label />
                </RequiresAuth>
              }
            />
            <Route
              path="/trash"
              element={
                <RequiresAuth>
                  <Trash />
                </RequiresAuth>
              }
            />
            <Route
              path="/archives"
              element={
                <RequiresAuth>
                  <Archives />
                </RequiresAuth>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
