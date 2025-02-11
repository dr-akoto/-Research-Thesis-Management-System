 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./COMPONENT/landing";
import Login from "./COMPONENT/login"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
