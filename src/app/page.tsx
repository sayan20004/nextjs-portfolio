import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/Button";

import {
  ArrowRightIcon,
  FileDown,
  PinIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content");
const SAYAN_BIRTH_YEAR = 2004;
const LIMIT = 2;

export default async function Home() {
  const age = new Date().getFullYear() - SAYAN_BIRTH_YEAR;

  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <Image
          className="rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
          src="/sayanmaity.jpg"
          alt="Sayan Maity, Full-Stack Web Developer"
          width={175}
          height={175}
          priority
          loading="eager"
        />

        <div className="flex flex-col">
          <h1 className="title text-5xl">
            Sayan Maity | Full-Stack Developer 👋
          </h1>

          <p className="mt-4 font-light text-neutral-700">
            {age}-years-old <s>game</s> full-stack web developer from India
          </p>

          <p className="mt-2 font-light text-neutral-700">
            I like to develop full-stack web apps, share thoughts about tech on{" "}
            <Link
              href="https://www.instagram.com/sayanwas/"
              target="_blank"
              className="link font-semibold underline underline-offset-4 hover:text-primary transition-colors"
            >
              INSTA.
            </Link>
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-neutral-800">
            <PinIcon className="size-5 text-primary" />
            <p className="font-semibold">India, West Bengal</p>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <Link href="/sayanmaity_cv.pdf" target="_blank">
              <Button variant="outline">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <Experience />

      {/* Featured Projects Section */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="title text-2xl sm:text-3xl">Featured Projects</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>

        <Projects limit={LIMIT} />
      </section>
    </article>
  );
}
