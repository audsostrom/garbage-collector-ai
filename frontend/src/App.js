import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./upload/upload";
import Landing from "./landing/landing";
import Cleaning from "./cleaning/cleaning";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/cleaning" element={<Cleaning />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
