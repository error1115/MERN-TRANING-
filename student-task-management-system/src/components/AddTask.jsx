import { useState } from "react";

 function AddTask({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle || !trimmedDescription) {
            return;
        }

        const task = {
            id: Date.now(),
            title: trimmedTitle,
            description: trimmedDescription,
            status: "pending",
        };

        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error(`Failed to add task: ${response.status}`);
            }

            const savedTask = await response.json();
            onAddTask(savedTask);
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    return (
        <section className="add-task-box">
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <label>
                    <span>Title</span>
                    <input
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>

                <label>
                    <span>Description</span>
                    <input
                        type="text"
                        placeholder="Enter task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <button type="submit" className="primary-btn">Add Task</button>
            </form>
        </section>
    );

 }
export default AddTask;
