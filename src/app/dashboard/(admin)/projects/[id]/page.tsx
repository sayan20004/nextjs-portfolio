import ProjectEditor from "@/components/dashboard/ProjectEditor";
import dbConnect from "@/lib/db";
import { Project } from "@/lib/models";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  await dbConnect();
  
  let project;
  try {
    project = await Project.findById(params.id).lean();
  } catch (e) {
    project = null;
  }
  
  if (!project) notFound();

  // Serialize MongoDB ObjectId to string for Client Component
  const serializedProject = JSON.parse(JSON.stringify(project));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="title text-3xl">Edit Project</h1>
      <ProjectEditor projectToEdit={serializedProject} />
    </div>
  );
}
