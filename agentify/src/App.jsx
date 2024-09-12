import React from "react";
import "./App.css";
import AgentCard from "./components/AgentCard.jsx";
import AgentCardCreated from "./components/agentCardCreated.jsx";
import TaskCardCreated from "./components/taskCardCreated.jsx";
import TaskCard from "./components/TaskCard.jsx";
import CircuitDiagramEditor from "./pages/editor.jsx";
import Landing from "./pages/landing.jsx";
import { useEffect, useState } from "react";

function App() {
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    var loaded = false;

    if (!loaded) {
      // Fetching the agents data once when the component mounts
      fetch("http://localhost:3000/tasks", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Raw tasks data:", data);
          const taskArray = Object.keys(data).map((a) => ({
            name: a,
            ...data[a],
          }));
          setTasks(taskArray);
          console.log("this is ctrl");
        })
        .catch((error) => console.error("Error fetching agents:", error));

      fetch("http://localhost:3000/agents", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          const agentsArray = Object.keys(data).map((key) => ({
            name: key,
            ...data[key],
          }));
          setAgents(agentsArray);
        })
        .catch((error) => console.error("Error fetching agents:", error));
    }
    return () => {
      loaded = true;
    };
  }, []); // Empty dependency array ensures this runs only once

  console.log("this is here");
  console.log(JSON.stringify(agents), "agents");
  console.log(tasks, "tasks");
  return (
    <div className="container">
      {/* Left panel for Agent Details */}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {agents.map((agent, index) => {
          return (
            <AgentCardCreated
              key={index}
              name={agent.name}
              role={agent.role}
              goal={agent.goal}
              backstory={agent.backstory}
            />
          );
        })}
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {tasks.map((task, index) => {
          // console.log(task.name, "task card is being made here");

          return (
            <TaskCardCreated
              key={index}
              taskName={task.name}
              description={task.description}
              expectedOutput={task.expected_output}
              agentAssigned={agents}
            />
          );
        })}
      </div>

      <Landing />
    </div>
  );
}

export default App;
