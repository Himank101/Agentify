import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { document } from "postcss";

function AgentCard({ name, task, role, backstory, goal }) {
  const [agentName, setAgentName] = React.useState("");
  const [agentGoal, setAgentGoal] = React.useState("");
  const [agentRole, setAgentRole] = React.useState("");
  const [agentBackstory, setAgentBackstory] = React.useState("");
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Agent</CardTitle>
        <CardDescription>Deploy your new agent in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of your agent"
                onChange={(e) => {
                  setAgentName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                placeholder="Role of your agent"
                onChange={(e) => {
                  setAgentRole(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="backstory">Backstory</Label>
              <Input
                id="backstory"
                placeholder="backstory of your agent"
                onChange={(e) => {
                  setAgentBackstory(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="goal">Goal</Label>
              <Input
                id="goal"
                placeholder="Goal of your agent"
                onChange={(e) => {
                  setAgentGoal(e.target.value);
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={() => {
            fetch("http://localhost:3000/agents", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                agent_name: agentName,
                desc: {
                  role: agentRole,
                  goal: agentGoal,
                  backstory: agentBackstory,
                },
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }}
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AgentCard;
