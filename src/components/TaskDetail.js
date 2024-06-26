import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/tasks/${id}`)
      .then(response => setTask(response.data))
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskDetail;
