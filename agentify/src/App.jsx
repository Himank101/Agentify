import React from "react";
import "./App.css";
import AgentCard from "./components/AgentCard.jsx";
import AgentCardCreated from "./components/agentCardCreated.jsx";
import TaskCardCreated from "./components/taskCardCreated.jsx";
import TaskCard from "./components/TaskCard.jsx";
import { Theme } from "@radix-ui/themes";

function App() {
  return (
    <div className="container">
      {/* Left panel for Agent Details */}
      <div className="left-panel">
        <AgentCard
          name="John Doe"
          task="Researcher Task"
          role="Senior Data Researcher"
          background="Experienced researcher in data science."
          goal="Uncover cutting-edge developments."
        />
      </div>

      {/* Right panel for Tools, Agents, and Tasks */}
      <div className="right-panel">
        <div className="tools-section">
          <h2>Tools</h2>
          <div className="tool-card">Webscraper</div>
          <div className="tool-card">Directory</div>
        </div>
        <div className="agents-section">
          <h2>Agents</h2>
          <div className="agent-card">Agent Name</div>
        </div>
        <div className="tasks-section">
          <h2>Tasks</h2>
          <TaskCard
            taskName="Task 1"
            description="Analyze data trends"
            agentAssigned="John Doe"
            expectedOutput="Explain in 5 points"
          />
        </div>
      </div>
      <div className="left-panel">
        <AgentCardCreated
          name="John Doe"
          task="Researcher Task"
          role="Senior Data Researcher"
          background="Experienced researcher in data science."
          goal="Uncover cutting-edge developments."
        />
      </div>

      {/* Right panel for Tools, Agents, and Tasks */}
      <div className="right-panel">
        <div className="tools-section">
          <h2>Tools</h2>
          <div className="tool-card">Webscraper</div>
          <div className="tool-card">Directory</div>
        </div>
        <div className="agents-section">
          <h2>Agents</h2>
          <div className="agent-card">Agent Name</div>
        </div>
        <div className="tasks-section">
          <h2>Tasks</h2>
          <TaskCardCreated
            taskName="Task 1"
            description="Analyze data trends"
            agentAssigned="John Doe"
            expectedOutput="Explain in 5 points"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
