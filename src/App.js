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
import {useState} from "react"

function App() {
  const [showAside, setShowAside] = useState(true)
  const { token } = useAuth();
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={700} draggable />
      {token && <Header setShowAside= {setShowAside}  showAside = {showAside}/>}
      <div className="d-flex" style={{minHeight: "100vh"}}>
        <div className= {`${showAside ? "sidebar-container" : "res-aside" }`} >{token && <Sidebar showAside = {showAside}/>}</div>
        <div className="page-content">
          {token && (
            <div className="w-100">
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
