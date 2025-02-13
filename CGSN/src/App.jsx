 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./COMPONENT/landing";
import Login from "./COMPONENT/login";
import GPACalculator from "./COMPONENT/gpa";
import Dashboard from "./COMPONENT/dasboard";
  // import Reports from "./COMPONENT/Report";
  // import Settings from "./COMPONENT/settings";


function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path ="/GPACalculator" element={<GPACalculator/>} />

    {/* <Route path="/Settings" element={<Sttings/>} /> */}
    {/* <Route path="/Reports" element={<Reports/>} /> */}
  </Routes>
</Router> 
    );
}

export default App;
