import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/about" exact element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
