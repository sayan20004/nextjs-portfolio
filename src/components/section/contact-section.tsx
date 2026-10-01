import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function ContactSection() {
  return (
    <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <div className="space-y-3">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm font-medium">
            Contact
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-sm">
            Want to chat? Just send me a message or email me directly at{" "}
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="text-blue-500 hover:underline"
            >
              {DATA.contact.email}
            </Link>{" "}
            and I&apos;ll respond as soon as I can.
          </p>
        </div>
      </BlurFade>
    </div>
  );
}
