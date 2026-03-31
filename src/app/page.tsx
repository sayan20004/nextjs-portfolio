import Link from "next/link";
import Image from "next/image"; // Re-add if used elsewhere, but not currently used in this design
import { cn } from "@/lib/utils";

import {
  FaTrophy,
  FaGitAlt,
  FaRocket,
  FaBrain,
  FaPaintBrush,
  FaDownload,
} from "react-icons/fa";


export default function Home() {
  return (
    <div className="mt-8 flex flex-col gap-12 pb-16 animate-blur-in">
      <section className="flex flex-row items-start justify-between gap-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Sayan Maity
          </h1>

          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/50"></span>
              <span>A full stack engineer from India, learning User experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/50"></span>
              <span>
                Currently working as Jr. Dev at,{" "}
                <Link href="https://www.wearetechinnovator.com" className="font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground">
                  TechInnovator
                </Link>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/50"></span>
              <span>
                Building{" "}
                <Link href="https://swiftkitbetav1.vercel.app" className="font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground">
                  SwiftKiit
                </Link>
                {" "}(Ready to use Components for your IOS Apps)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/50"></span>
              <span>Reach out if you want to find a way to work together!</span>
            </li>
          </ul>

          <div>
            <a
              href="/SayanMaity_Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md bg-secondary/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <FaDownload size={12} />
              Download CV
            </a>
          </div>
        </div>

        <div className="shrink-0">
          <Image
            src="/sayanmaity.jpg"
            alt="Sayan Maity"
            width={100}
            height={100}
            className="rounded-full object-cover ring-2 ring-muted"
            priority
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 ">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-xl">
          Side Projects
        </h2>

        <ul className="flex flex-col gap-4 text-sm">
          <li className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 group">
            <span className="flex flex-wrap items-baseline gap-2">
              <span className="font-semibold text-foreground">1.{" "}
                <Link href="https://snappyv1.vercel.app" className="underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground">
                  Snappy
                </Link>
              </span>
              <span className="text-muted-foreground">Advanced context based Todo WebApp</span>
            </span>
            <span className="flex items-center gap-2 shrink-0 text-sm text-muted-foreground">
              10 users <span className="size-2 rounded-full bg-green-500"></span>
            </span>
          </li>

          <li className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 group">
            <span className="flex flex-wrap items-baseline gap-2">
              <span className="font-semibold text-foreground">2.{" "}
                <Link href="https://swiftkitbetav1.vercel.app" className="underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground">
                  Swiftkiit
                </Link>
              </span>
              <span className="text-muted-foreground">helps make IOS apps faster</span>
            </span>
            <span className="flex items-center gap-2 shrink-0 text-sm text-muted-foreground">
              20 users <span className="size-2 rounded-full bg-green-500"></span>
            </span>
          </li>

          <li className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 group">
            <span className="flex flex-wrap items-baseline gap-2">
              <span className="font-semibold text-foreground">3.{" "}
                <Link href="https://screenshot-tool-beta.vercel.app" className="underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground">
                  Screenshot Tool
                </Link>
              </span>
              <span className="text-muted-foreground">Instantly turn any website into shareable presentation.</span>
            </span>
            <span className="flex items-center gap-2 shrink-0 text-sm text-muted-foreground">
              10 users
            </span>
          </li>

          {/* <li className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 group">
            <span className="flex flex-wrap items-baseline gap-2">
              <span className="font-semibold text-foreground">4.{" "}
                <Link href="#" className="underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground">
                  Dumbel
                </Link>
              </span>
              <span className="text-muted-foreground">match with developers, connect with people, etc.</span>
            </span>
            <span className="flex items-center gap-2 shrink-0 text-sm text-muted-foreground">
              80 users
            </span>
          </li>

          <li className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 group">
            <span className="flex flex-wrap items-baseline gap-2">
              <span className="font-semibold text-foreground">5.{" "}
                <Link href="#" className="underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground">
                  DevAltools
                </Link>
              </span>
              <span className="text-muted-foreground">ai dev tools directory</span>
            </span>
            <span className="flex items-center gap-2 shrink-0 text-sm text-muted-foreground">
              8 users
            </span>
          </li> */}
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
