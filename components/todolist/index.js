import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEditClick = (task) => {
    setIsModalOpen(true);
    setTaskToEdit(task);
  };

  const fetchTasks = async () => {
    const { data } = await axios.get("/api/task");
    setTasks(data);
  };

  const addTask = async () => {
    const { data } = await axios.post("/api/task", { description });
    setTasks([...tasks, data]);
    setDescription("");
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
                task.completed
                  ? "line-through text-gray-400"
                  : "text-purple-500"
              }`}
            >
              {task.description}
            </span>
            <button
              onClick={() => handleEditClick(task)}
              className="px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Edit
            </button>

            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              className="flex items-center justify-center"
              contentLabel="Edit Task"
              style={{
                content: {
                  width: "500px",
                  height: "auto",
                },
              }}
              overlayClassName="fixed z-50 inset-0 bg-black bg-opacity-50"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editTask(taskToEdit.id, e.target.elements.description.value);
                  setIsModalOpen(false);
                }}
                className="bg-gray-900 rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center fixed inset-0"
              >
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2 text-center"
                >
                  New Description:
                </label>
                <input
                  type="text"
                  name="description"
                  defaultValue={taskToEdit?.description || ""}
                  className="w-80 h-10 px-3 rounded-lg border-2 border-purple-500 bg-gray-900 text-purple-500 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />

                <div className="flex items-center justify-between w-full mt-4 flex-row space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>

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
