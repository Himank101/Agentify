const fs = require("fs");
const yaml = require("js-yaml");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;
// Load and parse YAML file

const agent_path = "../src/nocode/config/agents.yaml";
const task_path = "../src/nocode/config/tasks.yaml";
const crew_path = "../../nocode/src/nocode/crew.py";

const readfileContents = (path) => {
  try {
    const fileContents = fs.readFileSync(path, "utf8");
    return yaml.load(fileContents);
  } catch (e) {
    console.log(e);
  }
};

const writefileContent = (path, data) => {
  try {
    const yamlstr = yaml.dump(data);
    fs.writeFileSync(path, yamlstr, "utf8");
  } catch (e) {
    console.log(e);
  }
};

const agent_json = readfileContents(agent_path);
const task_json = readfileContents(task_path);

// var AGENTS = [];
// var TASKS = [];

const head = `
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task

# Uncomment the following line to use an example of a custom tool
# from nocode.tools.custom_tool import MyCustomTool

# Check our tools documentations for more information on how to use them
# from crewai_tools import SerperDevTool

@CrewBase
class NocodeCrew():
	"""Nocode crew"""
	agents_config = 'config/agents.yaml'
	tasks_config = 'config/tasks.yaml'
`;

// AGENTS = Object.values(agent_json);
// fs.writeFileSync(crew_path, head, "utf8");

function addagent(name) {
  const agent_str = `
	@agent
	def ${name}(self) -> Agent:
		return Agent(
			config=self.agents_config['${name}'],
			# tools=[MyCustomTool()], # Example of custom tool, loaded on the beginning of file
			verbose=True
		)
  `;
  fs.appendFileSync(crew_path, agent_str, "utf8");
}

function addtask(name) {
  const task_str = `
	@task
	def ${name}(self) -> Task:
		return Task(
			config=self.tasks_config['${name}'],
			# tools=[MyCustomTool()], # Example of custom tool, loaded on the beginning of file
		)
  `;
  fs.appendFileSync(crew_path, task_str, "utf8");
}

const tail = `

	@crew
	def crew(self) -> Crew:
		"""Creates the Nocode crew"""
		return Crew(
			agents=self.agents, # Automatically created by the @agent decorator
			tasks=self.tasks, # Automatically created by the @task decorator
			process=Process.sequential,
			verbose=True,
			# process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
		)`;

// const new_agent = { newagent: "" };
console.log(agent_json);

function exe(agent_json, task_json, head, tail) {
  fs.writeFileSync(crew_path, head, "utf8");

  const agent_names = Object.keys(agent_json);
  // const agent_desc = Object.values(agent_json);
  for (var i = 0; i < agent_names.length; i++) {
    addagent(agent_names[i]);
  }
  const task_names = Object.keys(task_json);
  for (var i = 0; i < task_names.length; i++) {
    addtask(task_names[i]);
  }

  fs.appendFileSync(crew_path, tail, "utf8");
}

app.get("/execute", (req, res) => {
  exe(agent_json, task_json, head, tail);
  res.json({ message: "func exe" });
});

app.get("/agents", (req, res) => {
  res.json(agent_json);
});

app.post("/agents", (req, res) => {
  const { agent_name, desc } = req.body;
  // AGENTS.push(agent_name);
  agent_json[agent_name] = desc;
  writefileContent(agent_path, agent_json);
  res.json(agent_json);
});

app.put("/agents/:name", (req, res) => {
  const agent_name = req.params.name;
  const desc = req.body.desc;
  if (!agent_json[agent_name]) {
    res.json({ message: "agent does not exist" });
  }
  agent_json[agent_name] = desc;
  writefileContent(agent_path, agent_json);
  res.json({ message: "successfully updated", agent_json });
});

app.delete("/agents/:name", (req, res) => {
  const agent_name = req.params.name;
  if (!agent_json[agent_name]) {
    res.json({ message: "agent does not exist" });
  }
  delete agent_json[agent_name];
  writefileContent(agent_path, agent_json);
  res.json({ message: "successfully deleted", agent_json });
});

app.get("/tasks", (req, res) => {
  res.json(task_json);
});

app.post("/tasks", (req, res) => {
  const { task_name, desc } = req.body;
  // TASKS.push(task_name);
  task_json[task_name] = desc;
  writefileContent(task_path, task_json);
  res.json(task_json);
});

app.put("/tasks/:name", (req, res) => {
  const task_name = req.params.name;
  const desc = req.body.desc;
  if (!task_json[task_name]) {
    res.json({ message: "task does not exist" });
  }
  task_json[task_name] = desc;
  writefileContent(task_path, task_json);
  res.json({ message: "successfully updated", task_json });
});

app.delete("/tasks/:name", (req, res) => {
  const task_name = req.params.name;
  if (!task_json[task_name]) {
    res.json({ message: "task does not exist" });
  }
  delete task_json[task_name];
  writefileContent(task_path, task_json);
  res.json({ message: "successfully deleted", task_json });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
