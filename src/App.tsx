
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/nav/footer";
import React from "react";
function App() {
  return (
    <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
