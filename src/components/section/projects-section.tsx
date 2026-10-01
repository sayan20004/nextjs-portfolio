/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Projects</h2>
        </div>
      </BlurFade>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {DATA.projects.map((project, id) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
          >
            <div className="group rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80 flex flex-col overflow-hidden h-full">
              {project.image && (
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col p-4 flex-1 justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-base flex items-center gap-1 group-hover:text-primary transition-colors">
                      {project.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </h3>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {project.dates}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.links && project.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.links.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                          {link.type}
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
