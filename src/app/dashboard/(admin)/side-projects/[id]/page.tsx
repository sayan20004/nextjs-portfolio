import SideProjectEditor from "@/components/dashboard/SideProjectEditor";
import dbConnect from "@/lib/db";
import { SideProject } from "@/lib/models";

async function getSideProject(id: string) {
  try {
    await dbConnect();
    const project = await SideProject.findById(id).lean();
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Failed to fetch side project:", error);
    return null;
  }
}

export default async function EditSideProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getSideProject(params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="title text-3xl">Edit Side Project</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Update {project.title}
        </p>
      </div>

      <SideProjectEditor project={project} />
    </div>
  );
}
