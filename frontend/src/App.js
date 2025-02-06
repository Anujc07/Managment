import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddComponent from './components/AddComponent';
import AddVehicle from './components/AddVehicle';
import AddIssue from './components/AddIssue';
import FinalPrice from './components/FinalPrice';
import RevenueGraph from './components/RevenueGraph';
import './App.css';  // Import the CSS file

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/add-component">Add Component</Link>
          <Link to="/add-vehicle">Add Vehicle</Link>
          <Link to="/add-issue">Add Issue</Link>
          <Link to="/final-price">Calculate Final Price</Link>
          <Link to="/revenue">Revenue Graph</Link>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/add-component" element={<AddComponent />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
            <Route path="/add-issue" element={<AddIssue />} />
            <Route path="/final-price" element={<FinalPrice />} />
            <Route path="/revenue" element={<RevenueGraph />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
