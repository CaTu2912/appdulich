import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Homepage"; 
import Login from "./aut/Login"; 
import Navbar from "./compment/navbar"; 
import CreatePost from"./page/post"


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
