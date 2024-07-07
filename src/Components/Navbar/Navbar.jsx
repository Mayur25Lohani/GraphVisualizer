import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
      <h1 className="title">Visualizing Algorithms</h1>
      <div className="links">
        <ul>
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sorting-visualizer">BubbleSort</Link>
          </li>
          <li>
            <Link to="/path-visualizer">Dijkstra</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
