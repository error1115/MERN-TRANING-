import { useState } from "react";

function AddTask({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(event) {
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

        onAddTask(task);
        setTitle("");
        setDescription("");
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
