"use client";
import AgentCard from "../components/AgentCard";
import TaskCard from "../components/TaskCard";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Landing() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen bg-gray-100">
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
            <TaskCard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
