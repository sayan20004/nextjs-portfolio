import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getOrCreateHomepageIntro } from "@/lib/cms-actions";
import ReactMarkdown from "react-markdown";
import dbConnect from "@/lib/db";
import { SideProject } from "@/lib/models";

import {
  FaTrophy,
  FaGitAlt,
  FaRocket,
  FaBrain,
  FaPaintBrush,
  FaDownload,
} from "react-icons/fa";

async function getSideProjectsForHome() {
  try {
    await dbConnect();
    const projects = await SideProject.find({ showOnHomepage: true })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to fetch side projects:", error);
    return [];
  }
}

export default async function Home() {
  const intro = await getOrCreateHomepageIntro();
  const sideProjects = await getSideProjectsForHome();
  
  return (
    <div className="mt-8 flex flex-col gap-12 pb-16 animate-blur-in">
      <section className="flex flex-row items-start justify-between gap-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {intro.name || "Your Name"}
          </h1>

          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            {intro.bio && intro.bio.map((point: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/50"></span>
                <span className="prose prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <span>{children}</span>,
                      a: ({ href, children }) => (
                        <a href={href} className="underline decoration-muted-foreground/50 underline-offset-2 hover:decoration-foreground" target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {point}
                  </ReactMarkdown>
                </span>
              </li>
            ))}
          </ul>

          <div>
            {intro.cvLink ? (
              <a
                href={intro.cvLink}
                download
                className="inline-flex items-center gap-2 rounded-md bg-secondary/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <FaDownload size={12} />
                Download CV
              </a>
            ) : null}
          </div>
        </div>

        <div className="shrink-0">
          {intro.photo && (
            <Image
              src={intro.photo}
              alt={intro.name || "Profile"}
              width={100}
              height={100}
              className="rounded-full object-cover ring-2 ring-muted"
              priority
            />
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-xl">
            Side Projects
          </h2>
          {sideProjects.length > 0 && (
            <Link
              href="/projects"
              className="text-sm underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground transition-colors"
            >
              View all
            </Link>
          )}
        </div>

        <ul className="flex flex-col gap-4 text-sm">
          {sideProjects.length > 0 ? (
            sideProjects.map((project: any, idx: number) => (
              <li
                key={project._id}
                className="group relative rounded-lg border border-muted/30 p-4 transition-all duration-300 hover:border-muted/60 hover:bg-muted/20"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-4">
                  <span className="flex flex-wrap items-baseline gap-2">
                    <span className="font-semibold text-foreground">
                      {idx + 1}.{" "}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground transition-colors"
                      >
                        {project.title}
                      </a>
                    </span>
                    <span className="text-muted-foreground">
                      {project.description}
                    </span>
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    {project.usersOnline > 0 && (
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        {project.usersOnline} users{" "}
                        <span className="size-2 rounded-full bg-green-500"></span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover effect - Show visit button */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto flex items-center justify-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-secondary rounded-md text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Visit Site →
                  </a>
                </div>

                {/* Display project images if available */}
                {project.images?.length > 0 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                    {project.images.slice(0, 3).map((img: string, imgIdx: number) => (
                      <img
                        key={imgIdx}
                        src={img}
                        alt={`${project.title} preview`}
                        className="w-24 h-16 object-cover rounded-md flex-shrink-0"
                      />
                    ))}
                  </div>
                )}
              </li>
            ))
          ) : (
            <p className="text-muted-foreground">No side projects yet.</p>
          )}
        </ul>
      </section>

      {/* <section className="flex flex-col gap-6 ">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-xl">
          Open Source Contributions
        </h2>

        <ul className="flex flex-col gap-5 text-base">
          <li className="flex items-start gap-3">
            <SparklesIcon />
            <span className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <Link href="#" className="font-semibold text-foreground underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground">
                AsyncAPI/website
              </Link>
              <span className="text-muted-foreground">Conference archive page, and some design fixes. (Dec 2024)</span>
            </span>
          </li>

          <li className="flex items-start gap-3">
            <GlobeIcon />
            <span className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <Link href="#" className="font-semibold text-foreground underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground">
                DiceDB/website
              </Link>
              <span className="text-muted-foreground">Improved the Navbar UX, and fixed some broken links. (Feb 2024)</span>
            </span>
          </li>

          <li className="flex items-start gap-3">
            <LeafIcon />
            <span className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <Link href="#" className="font-semibold text-foreground underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground">
                MojaGlobal/flint-ui
              </Link>
              <span className="text-muted-foreground">Some UI fixes when I was getting started (Feb 2024)</span>
            </span>
          </li>
        </ul>
      </section> */}

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-xl">
          Achievements & Extra Activities
        </h2>

        <ul className="flex flex-col gap-4 text-sm">
          <li className="grid grid-cols-[20px_140px_1fr] items-start gap-x-3">
            <FaTrophy className="mt-0.5 shrink-0 text-yellow-400" size={14} />
            <span className="font-semibold text-foreground">Hackathon Organizer</span>
            <span className="text-muted-foreground">Organized and mentored participants in an intra-college Hackathon &amp; Quiz event for BCA students at CCLMS. (2024)</span>
          </li>

          <li className="grid grid-cols-[20px_140px_1fr] items-start gap-x-3">
            <FaRocket className="mt-0.5 shrink-0 text-blue-400" size={14} />
            <span className="font-semibold text-foreground">iOS & SwiftUI Dev</span>
            <span className="text-muted-foreground">Self-taught Swift and SwiftUI to build native iOS apps alongside web development, including an AI-powered quiz app.</span>
          </li>

          <li className="grid grid-cols-[20px_140px_1fr] items-start gap-x-3">
            <FaBrain className="mt-0.5 shrink-0 text-purple-400" size={14} />
            <span className="font-semibold text-foreground">AI-Powered Projects</span>
            <span className="text-muted-foreground">Developed an AI Quiz Generator (Web + iOS) using the Gemini API that auto-creates MCQs from uploaded PDFs.</span>
          </li>

          <li className="grid grid-cols-[20px_140px_1fr] items-start gap-x-3">
            <FaPaintBrush className="mt-0.5 shrink-0 text-pink-400" size={14} />
            <span className="font-semibold text-foreground">College UI/UX Lead</span>
            <span className="text-muted-foreground">Led the UI/UX design of the CCLMS college website landing page, integrating modern scrolling libraries with traditional Indian aesthetics.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
