import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import notesContext, { notesState } from "./contexts/notesContext";

function App() {
  return (
    <notesState>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/about" exact element={<About />} />
        </Routes>
      </Router>
    </notesState>
  );
}

export default App;
