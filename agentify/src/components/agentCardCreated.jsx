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

function AgentCardCreated({ name, task, role, background, goal }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
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
              <Label htmlFor="background" className="flex flex-col space-y-1">
                <span>Background</span>
                <span className="text-xs font-normal leading-snug text-muted-foreground">
                  {background}
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="task">Task</Label>
              <Select>
                <SelectTrigger id="task">
                  <SelectValue placeholder="Task" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Edit</Button>
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AgentCardCreated;
