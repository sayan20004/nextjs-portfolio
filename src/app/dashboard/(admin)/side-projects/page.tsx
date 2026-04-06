import SideProjectEditor from "@/components/dashboard/SideProjectEditor";
import DeleteSideProjectButton from "@/components/dashboard/DeleteSideProjectButton";
import dbConnect from "@/lib/db";
import { SideProject } from "@/lib/models";
import Link from "next/link";

async function getSideProjects() {
  try {
    await dbConnect();
    const projects = await SideProject.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to fetch side projects:", error);
    return [];
  }
}

export default async function SideProjectsPage() {
  const projects = await getSideProjects();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="title text-3xl">Side Projects</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Manage your side projects displayed on the homepage
        </p>
      </div>

      <section>
        <h2 className="title mb-4 text-xl">Create New Project</h2>
        <SideProjectEditor />
      </section>

      {projects.length > 0 && (
        <section>
          <h2 className="title mb-4 text-xl">Existing Projects</h2>
          <div className="space-y-6">
            {projects.map((project: any) => (
              <div
                key={project._id}
                className="border rounded-lg p-4 bg-muted/30"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Link:</span>{" "}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {project.link}
                      </a>
                    </div>
                    <div>
                      <span className="font-medium">Users Online:</span>{" "}
                      {project.usersOnline}
                    </div>
                    <div>
                      <span className="font-medium">Show on Homepage:</span>{" "}
                      {project.showOnHomepage ? "✓ Yes" : "✗ No"}
                    </div>
                  </div>

                  {project.images?.length > 0 && (
                    <div>
                      <span className="font-medium text-sm block mb-2">
                        Images:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.images.map((img: string, idx: number) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${project.title} image ${idx + 1}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Link
                      href={`/dashboard/side-projects/${project._id}`}
                      className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteSideProjectButton id={project._id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
