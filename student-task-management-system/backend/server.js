// bring express in node.js
const express=require('express');
const cors=require('cors');

// create express app using what we imported
const app=express();
// install cors middleware to allow cross-origin requests
app.use(cors());

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is the description for Task 1",
    status: "pending",
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is the description for Task 2",
    status: "completed",
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is the description for Task 3",
    status: "pending",
  },
];
app.get("/api/tasks", (req, res) => {
  res.json(initialTasks);
});

//API Route(testing backend connection)
app.get("/", (req, res) => {
  res.send("backend is working");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});