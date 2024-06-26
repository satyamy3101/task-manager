// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/tasks');
//         console.log('Fetched tasks:', response.data); // Check fetched tasks
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
//       }
//     };

//     fetchTasks();
//   }, []);

//   console.log('Current tasks state:', tasks); // Check current tasks state

//   return (
//     <div>
//       <h2>Task List</h2>
//       {tasks.length === 0 ? (
//         <p>No tasks found.</p>
//       ) : (
//         <ul>
//           {tasks.map((task) => (
//             <li key={task._id}>{task.title}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TaskList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/tasks')
//       .then(response => setTasks(response.data))
//       .catch(error => console.error('Error fetching tasks:', error));
//   }, []);

//   const deleteTask = (id) => {
//     axios.delete(`http://localhost:5000/api/tasks/${id}`)
//       .then(() => setTasks(tasks.filter(task => task._id !== id)))
//       .catch(error => console.error('Error deleting task:', error));
//   };

//   return (
//     <div className="container">
//       <h1>Task List</h1>
//       <Link to="/task/new" className="btn btn-primary">Add New Task</Link>
//       <ul>
//         {tasks.map(task => (
//           <li key={task._id} className="task-card">
//             <Link to={`/task/${task._id}`}><h3>{task.title}</h3></Link>
//             <p>{task.description}</p>
//             <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
//             <button onClick={() => deleteTask(task._id)} className="btn btn-danger">Delete</button>
//             <Link to={`/task/edit/${task._id}`} className="btn btn-primary">Edit</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskList;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const TaskList = ({ tasks, setTasks }) => {
//   const deleteTask = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       if (response.status === 200) {
//         setTasks(tasks.filter(task => task._id !== id));  // Ensure _id matches the correct property
//       }
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Task List</h1>
//       <Link to="/task/new" className="btn btn-primary">Add New Task</Link>
//       <ul>
//         {tasks.map(task => (
//           <li key={task._id} className="task-card">
//             <Link to={`/task/${task._id}`}><h3>{task.title}</h3></Link>
//             <p>{task.description}</p>
//             <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
//             <button onClick={() => deleteTask(task._id)} className="btn btn-danger">Delete</button>
//             <Link to={`/task/edit/${task._id}`} className="btn btn-primary">Edit</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="task-card">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="task-actions">
                <button onClick={() => handleDelete(task._id)}>Delete</button>
                <Link to={`/task/edit/${task._id}`} className="edit-button">Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/task/new" className="add-task-button">Add Task</Link>
    </div>
  );
};

export default TaskList;

