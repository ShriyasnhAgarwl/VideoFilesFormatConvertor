import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import VideoConverter from "./VideoConvertor"; // Import the VideoConverter component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Video Conversion Tool</h1>
        </header>
        <Routes>
          <Route
            path="/"
            element={<h2>Welcome to the Video Conversion App</h2>}
          />
          <Route path="/video-converter" element={<VideoConverter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
