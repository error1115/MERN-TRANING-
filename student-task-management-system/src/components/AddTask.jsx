import { useState } from "react";

export default function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      alert("Please fill in both title and description.");
      return;
    }
    const newTask = {
      title: trimmedTitle,
      description: trimmedDescription,
      status: "Pending",
    };

    try {
      const response = await fetch("/api/tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const savedTask = await response.json();
      props.onAddTask(savedTask);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  return (
    <div className="add-task">
      <form onSubmit={handleSubmit}>
        <label> Add Title </label>
        <input
          type="text"
          value={title}
          placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label> Add Description </label>
        <input
          type="text"
          value={description}
          placeholder="Task description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}