import { Link } from "react-router-dom";

function TaskCard({ id, title, description, status, onToggle, onDelete }) {
    return (
        <div className={`task-card ${status.toLowerCase() === "completed" ? "completed" : "pending"}`}>
            <div className="task-content">
                <div className="task-header-row">
                    <h3>{title}</h3>
                    <span className="status-badge">{status}</span>
                </div>
                <p>{description}</p>
            </div>

            <div className="task-actions">
                <button className="secondary-btn" onClick={onToggle}>
                    Change Status
                </button>
                <button className="delete-btn" onClick={onDelete}>
                    Delete
                </button>
                <Link to={`/tasks/${id}`} className="details-link">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default TaskCard;