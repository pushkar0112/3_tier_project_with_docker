import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = "http://localhost:8080/api/tasks";

  // Get tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add task
  const addTask = async () => {

    if (!title || !description) {
      alert("Please enter title and description");
      return;
    }

    try {

      await axios.post(API_URL, {
        title: title,
        description: description,
        status: "TODO"
      });

      setTitle("");
      setDescription("");

      fetchTasks();

    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {

    try {

      await axios.delete(`${API_URL}/${id}`);

      fetchTasks();

    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Load tasks when page opens
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{
      maxWidth: "800px",
      margin: "40px auto",
      fontFamily: "Arial"
    }}>

      <h1>Task Management System</h1>

      <hr />

      <h2>Add Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "10px"
        }}
      />

      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "10px"
        }}
      />

      <button
        onClick={addTask}
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Add Task
      </button>

      <hr />

      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (

        tasks.map((task) => (

          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "5px"
            }}
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              Status: <strong>{task.status}</strong>
            </p>

            <button
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>

          </div>

        ))

      )}

    </div>
  );
}

export default App;