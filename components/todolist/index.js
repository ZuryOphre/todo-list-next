import { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await axios.get('/api/task');
    setTasks(data);
  };

  const addTask = async () => {
    const { data } = await axios.post('/api/task', { description });
    setTasks([...tasks, data]);
    setDescription('');
  };

  const updateTask = async (id, completed) => {
    const { data } = await axios.put(`/api/task?id=${id}`, { completed });
    setTasks(tasks.map((task) => (task.id === id ? data : task)));
  };

  const editTask = async (id, description) => {
    const { data } = await axios.put(`/api/task?id=${id}`, { description });
    setTasks(tasks.map((task) => (task.id === id ? data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/task?id=${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => updateTask(task.id, e.target.checked)}
            />
            {task.description}
            <button onClick={() => editTask(task.id, prompt('Enter new description:', task.description))}>
              Edit
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
