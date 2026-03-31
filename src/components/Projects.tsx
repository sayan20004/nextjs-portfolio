import { ProjectCard } from "./ProjectCard";
import dbConnect from "@/lib/db";
import { Project as ProjectModel } from "@/lib/models";

interface Props {
  limit?: number;
}

export default async function Projects({ limit }: Props) {
  await dbConnect();
  
  let query = ProjectModel.find().sort({ createdAt: -1 });
  if (limit) {
    query = query.limit(limit);
  }
  
  const projects = await query.lean();

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {projects.map((project: any) => (
        <ProjectCard key={project._id.toString()} project={project} />
      ))}
    </section>
  );
}
