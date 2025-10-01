import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";

import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/Button";

import {
  ArrowDownRight,
  ArrowRightIcon,
  FileDown,
  PinIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content");
const SAYAN_BIRTH_YEAR = 2004;
const LIMIT = 2; // max show 2

export default async function Home() {

  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <Image
          className="rounded-lg"
          src="/sayanmaity.jpg"
          alt="Photo of Ted"
          width={175}
          height={175}
          priority
        />
        <div className="flex flex-col">
          <h1 className="title text-5xl">Sayan Maity | Full-Stack Developer 👋</h1>
          <p className="mt-4 font-light">
            {/* Update my age */}
            {new Date().getFullYear() - SAYAN_BIRTH_YEAR}
            -years-old <s>game</s> full-stack web developer from India
          </p>
          <p className="mt-2 font-light">
            I like to develop full-stack web apps, share thoughts about tech on{" "}
            <Link
              href="https://www.instagram.com/sayanwas/"
              target="_blank"
              className="link font-semibold"
            >
              INSTA.
            </Link>
          </p>
          <div className="mt-4 flex items-end gap-1">
            <PinIcon className="size-5" />
            <p className="font-semibold">India, West Bengal</p>
          </div>
          <section className="mt-8 flex items-center gap-8">
            <Link href="/sayanmaity_cv.pdf" target="_blank">
              <Button variant="outline">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </div>
      </section>

      <Experience />

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-2xl sm:text-3xl">featured projects</h2>
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
