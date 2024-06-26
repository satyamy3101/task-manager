
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import TaskForm from './components/TaskForm'; // Adjust path as needed
import TaskList from './components/TaskList'; // Adjust path as needed

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = () => {
    console.log('Task has been saved successfully.');
    fetchTasks(); // Fetch the updated list of tasks after saving
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <Routes>
        <Route path="/task/new" element={<TaskForm onSave={handleSave} />} />
        <Route path="/task/:id" element={<TaskForm onSave={handleSave} />} />
        <Route path="/" element={<TaskList tasks={tasks} setTasks={setTasks} />} />
      </Routes>
    </div>
  );
};

export default App;


