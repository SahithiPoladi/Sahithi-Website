import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Headers from "./components/Headers/Headers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Headers />
      </BrowserRouter>
    </div>
  );
}

export default App;
