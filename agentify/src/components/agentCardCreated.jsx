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

// making input displayed like scratch blocks
// <ScratchInput label="Name:" value={name} />

function AgentCardCreated({ name, task, role, backstory, goal }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name" className="flex flex-col space-y-1">
              <span>Name</span>
              <span className="text-xs font-normal leading-snug text-muted-foreground">
                {name}
              </span>
            </Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="role" className="flex flex-col space-y-1">
              <span>Role</span>
              <span className="text-xs font-normal leading-snug text-muted-foreground">
                {role}
              </span>
            </Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="backstory" className="flex flex-col space-y-1">
              <span>Backstory</span>
              <span className="text-xs font-normal leading-snug text-muted-foreground">
                {backstory}
              </span>
            </Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="goal" className="flex flex-col space-y-1">
              <span>Goal</span>
              <span className="text-xs font-normal leading-snug text-muted-foreground">
                {goal}
              </span>
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Edit</Button>
        <Button
          variant="destructive"
          onClick={() => {
            fetch(`http://localhost:3000/agents/${name}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
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
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AgentCardCreated;
