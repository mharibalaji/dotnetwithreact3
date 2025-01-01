import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/login";
import RegisterPage from "./pages/RegisterPage";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Register route */}
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/edit/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
