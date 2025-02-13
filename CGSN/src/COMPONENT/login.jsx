import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaRegClock, FaTasks, FaUsers, FaChartBar, FaCogs, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';

const Sidebar = () => (
  <aside className="w-64 bg-gray-100 p-6 min-h-screen flex flex-col">
    <div className="flex items-center gap-3">
      <FaUserCircle className="text-3xl text-gray-600" />
      <div>
        <h2 className="text-lg font-semibold">Leonard Small</h2>
        <p className="text-sm text-gray-500">leonardsml@gmail.com</p>
      </div>
    </div>
    <nav className="mt-6 flex-1">
      <ul>
        <li><Link to="/" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaRegClock /> Timer</Link></li>
        <li><Link to="/reports" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaChartBar /> Reports</Link></li>
        <li><Link to="/projects" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaTasks /> Projects</Link></li>
        <li><Link to="/team" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaUsers /> Team</Link></li>
        <li><Link to="/settings" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaCogs /> Settings</Link></li>
        <li><Link to="/help" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded"><FaQuestionCircle /> Help Center</Link></li>
      </ul>
    </nav>
  </aside>
);

const Dashboard = () => (
  <main className="flex-1 p-6 bg-white">
    <div className="flex justify-between items-center gap-4">
      <input type="text" placeholder="What are you working on?" className="p-3 border rounded w-2/3" />
      <button className="bg-blue-600 text-white px-6 py-2 rounded">+ Task</button>
      <button className="bg-green-600 text-white px-6 py-2 rounded">Start</button>
    </div>
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Today, 23 Sept 2023</h2>
      <div className="mt-4 bg-gray-50 p-4 rounded shadow-md">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">Create Design System</p>
          <button className="text-sm bg-blue-500 text-white px-4 py-1 rounded">Continue</button>
        </div>
      </div>
    </div>
  </main>
);

const App = () => (
  <Router>
    <div className="flex min-h-screen">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<div>Reports Page</div>} />
        <Route path="/projects" element={<div>Projects Page</div>} />
        <Route path="/team" element={<div>Team Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/help" element={<div>Help Center</div>} />
      </Routes>
    </div>
  </Router>
);

export default App;
