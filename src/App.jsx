import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import UserModule from "./components/UserModule";
import TestModel from "./components/TestModel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin_dashboard" element={<Dashboard />} />
        <Route path="/user_dashboard" element={<UserModule />} />
        <Route path="/textmodel" element={<TestModel />} />
      </Routes>
    </Router>
  );
};

export default App;
