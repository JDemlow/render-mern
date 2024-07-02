import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BuildingsList from "./components/BuildingsList";
import BuildingDetail from "./components/BuildingDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuildingsList />} />
        <Route path="/buildings/:id" element={<BuildingDetail />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
