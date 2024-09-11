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

function AgentCard({ name, task, role, backstory, goal }) {
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
              <Input id="name" placeholder="Name of your agent" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="Role of your agent" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="backstory">Backstory</Label>
              <Input id="backstory" placeholder="backstory of your agent" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="goal">Goal</Label>
              <Input id="goal" placeholder="Goal of your agent" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Add</Button>
      </CardFooter>
    </Card>
  );
}

export default AgentCard;
