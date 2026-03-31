import Link from "next/link";
import { Button } from "@/components/ui/Button";
import dbConnect from "@/lib/db";
import { Project } from "@/lib/models";
import DeleteProjectButton from "@/components/dashboard/DeleteProjectButton";

export default async function ProjectsAdminPage() {
  await dbConnect();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="title text-3xl">Projects</h1>
        <Button asChild>
          <Link href="/dashboard/projects/new">New Project</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project: any) => (
          <div key={project._id.toString()} className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div>
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/projects/${project._id.toString()}`}>Edit</Link>
              </Button>
              <DeleteProjectButton id={project._id.toString()} />
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-muted-foreground">No projects found. Create one to get started.</p>
        )}
      </div>
    </div>
  );
}
