import * as React from "react";
import { useState } from "react";

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

function TaskCard() {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskOutput, setTaskOutput] = useState("");
  const [taskAssignedAgent, setTaskAssignedAgente] = useState("");
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
        <CardDescription>Make a new task</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of your task"
                onChange={(e) => {
                  setTaskName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="desc">Description</Label>
              <Input
                id="desc"
                placeholder="Description your task"
                onChange={(e) => {
                  setTaskDesc(e.target.value);
                }}
              />
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="expected_otuput">Expected Output</Label>
                <Input
                  id="expected_otuput"
                  placeholder="Describe what the output should look like"
                  onChange={(e) => {
                    setTaskOutput(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={() => {
            fetch("http://localhost:3000/tasks", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                task_name: agentName,
                desc: {
                  description: agentRole,
                  expected_output: agentGoal,
                  // agent: agentBackstory,
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

export default TaskCard;
