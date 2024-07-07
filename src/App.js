import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import Navbar from './Components/Navbar/Navbar';
import SortingVisualizer from './BubbleSort/SortingVisualizer';
import Home from './Home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sorting-visualizer" element={<SortingVisualizer />} />
          <Route path="/path-visualizer" element={<PathfindingVisualizer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
