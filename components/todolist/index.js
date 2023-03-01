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
  <div className="flex flex-col justify-center items-center bg-gray-900 h-screen">
    <input
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-80 h-10 px-3 rounded-lg border-2 border-purple-500 bg-gray-900 text-purple-500 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      placeholder="What's on your mind?"
    />
    <button
      onClick={addTask}
      className="px-4 py-2 mt-4 rounded-lg bg-purple-500 hover:bg-purple-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
      Add
    </button>
    <ul className="mt-6 space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => updateTask(task.id, e.target.checked)}
            className="h-6 w-6 rounded-lg border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span
            className={`flex-1 ${
              task.completed ? 'line-through text-gray-400' : 'text-purple-500'
            }`}
          >
            {task.description}
          </span>
          <button
            onClick={() =>
              editTask(task.id, prompt('Enter new description:', task.description))
            }
            className="px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

};

export default TodoList;
