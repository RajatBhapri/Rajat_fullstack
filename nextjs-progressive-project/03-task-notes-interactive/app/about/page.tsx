import type { Metadata } from "next";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about the Task Notes application.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About Task Notes</h1>

        <p className="mt-3 text-muted-foreground">
          Task Notes is a task management application designed to help users
          create, organize, and manage tasks efficiently.
        </p>
      </div>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Tech Stack</CardTitle>
          <CardDescription>
            Technologies used to build this project.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3 text-muted-foreground list-disc pl-5">
            <li>Next.js App Router for routing and layouts</li>
            <li>TypeScript for safer, maintainable code</li>
            <li>Tailwind CSS for responsive styling</li>
            <li>Ready to integrate with your Node Task Notes API</li>
          </ul>
        </CardContent>
      </Card>

      {/* Purpose */}
      <Card>
        <CardHeader>
          <CardTitle>Purpose</CardTitle>
        </CardHeader>

        <CardContent className="text-muted-foreground">
          Right now this project provides the frontend foundation. In the next
          step, you can connect it to your backend API to fetch, create, update,
          and delete task data.
        </CardContent>
      </Card>
    </section>
  );
}
