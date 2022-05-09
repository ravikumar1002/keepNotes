import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { Header, Sidebar, Search, NoteCard , SaveNotes} from "./components/index";
import { Home } from "./pages/index";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>
        <div className="page-content">
          <div>
            <Search />
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mockman" element={<Mockman />} />
            </Routes>
            <NoteCard/>
            <SaveNotes/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
