import React from "react";
import "./App.css";
import AgentCard from "./components/AgentCard.jsx";
import AgentCardCreated from "./components/agentCardCreated.jsx";
import TaskCardCreated from "./components/taskCardCreated.jsx";
import TaskCard from "./components/TaskCard.jsx";
import CircuitDiagramEditor from "./pages/editor.jsx";
import Landing from "./pages/landing.jsx";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ScratchBlock = ({ children, color = "bg-blue-500" }) => (
  <div
    className={`${color} rounded-lg p-2 text-white font-mono text-sm shadow-md`}
  >
    {children}
  </div>
);

const ScratchInput = ({ label, value }) => (
  <div className="flex items-center space-x-2">
    <span className="text-gray-700">{label}</span>
    <ScratchBlock>{value}</ScratchBlock>
  </div>
);

const ProjectCard = ({ title, description }) => (
  <Card className="h-full w-full rounded-none border-none">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div className="grid w-full items-center gap-4">
          <ScratchInput label="Name:" value="my-awesome-project" />
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium text-gray-700">
              Framework:
            </span>
            <Select>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="next">
                  <ScratchBlock color="bg-green-500">Next.js</ScratchBlock>
                </SelectItem>
                <SelectItem value="sveltekit">
                  <ScratchBlock color="bg-orange-500">SvelteKit</ScratchBlock>
                </SelectItem>
                <SelectItem value="astro">
                  <ScratchBlock color="bg-purple-500">Astro</ScratchBlock>
                </SelectItem>
                <SelectItem value="nuxt">
                  <ScratchBlock color="bg-teal-500">Nuxt.js</ScratchBlock>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="absolute bottom-0 left-0 right-0 flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button>Deploy</Button>
    </CardFooter>
  </Card>
);

function App() {
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [isOpen, setIsOpen] = React.useState(false);
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

      <div className="relative min-h-screen bg-gray-100">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
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
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {tasks.map((task, index) => {
            // console.log(task.name, "task card is being made here");

            return (
              <TaskCardCreated
                key={index}
                taskName={task.name}
                description={task.description}
                expectedOutput={task.expected_output}
                agentAssigned={task.agent}
              />
            );
          })}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div
          className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs defaultValue="project1" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="project1">Agent</TabsTrigger>
              <TabsTrigger value="project2">Task</TabsTrigger>
            </TabsList>
            <TabsContent value="project1" className="flex-grow overflow-auto">
              <AgentCard />
            </TabsContent>
            <TabsContent value="project2" className="flex-grow overflow-auto">
              <TaskCard availableAgents={agents} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
