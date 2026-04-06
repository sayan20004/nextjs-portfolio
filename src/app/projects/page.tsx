import Projects from "@/components/Projects";
import Link from "next/link";
import dbConnect from "@/lib/db";
import { SideProject } from "@/lib/models";

async function getAllSideProjects() {
  try {
    await dbConnect();
    const projects = await SideProject.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to fetch side projects:", error);
    return [];
  }
}

export default async function ProjectPage() {
  const sideProjects = await getAllSideProjects();

  return (
    <article className="mt-8 flex flex-col gap-12 pb-16">
      <div>
        <h1 className="title">my projects.</h1>
        <p className="text-muted-foreground mt-2">Portfolio and side projects</p>
      </div>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">Portfolio Projects</h2>
        <Projects />
      </section>

      {sideProjects.length > 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Side Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sideProjects.map((project: any) => (
              <a
                key={project._id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-lg border border-muted/30 overflow-hidden bg-muted/10 transition-all duration-300 hover:border-muted/60 hover:bg-muted/20"
              >
                <div className="p-6 flex flex-col gap-4 h-full">
                  {/* Project header */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Project images */}
                  {project.images?.length > 0 && (
                    <div className="flex gap-2 overflow-hidden rounded-md">
                      {project.images.slice(0, 2).map((img: string, imgIdx: number) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={imgIdx}
                          src={img}
                          alt={`${project.title} preview`}
                          className="w-full h-32 object-cover"
                        />
                      ))}
                    </div>
                  )}

                  {/* Project stats */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-muted/20">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {project.usersOnline > 0 && (
                        <>
                          {project.usersOnline} users
                          <span className="size-2 rounded-full bg-green-500"></span>
                        </>
                      )}
                    </div>
                    <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Visit →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
