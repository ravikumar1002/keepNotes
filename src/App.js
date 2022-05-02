import "./App.css";
import Mockman from "mockman-js";
function App() {
  return (
    <div className="App">
      <Route path="/mockman" element={<Mockman />} />
    </div>
  );
}

export default App;
