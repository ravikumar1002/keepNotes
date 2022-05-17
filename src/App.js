import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import {
  Header,
  Sidebar,
  Search,
} from "./components/index";
import { Home, Login, SignUp , Trash} from "./pages/index";
import { RequiresAuth } from "./pages/auth/components/RequiresAuth";
import { useAuth } from "./context/auth-context";

function App() {
  const { token } = useAuth();
  return (
    <div className="App">
      {token && <Header />}
      <div className="d-flex">
        <div>{token && <Sidebar />}</div>
        <div className="page-content">
          <div>{token && <Search />}</div>
          <div>
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
                path="/Trash"
                element={
                  <RequiresAuth>
                    <Trash />
                  </RequiresAuth>
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
