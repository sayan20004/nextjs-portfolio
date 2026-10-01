/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

export default function WorkSection() {
  return (
    <div className="flex flex-col gap-8">
      {DATA.work.map((work, index) => (
        <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + index * 0.05}>
          <Link
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-x-3 justify-between group"
          >
            <div className="flex items-start gap-x-3 flex-1 min-w-0">
              {work.logoUrl ? (
                <img
                  src={work.logoUrl}
                  alt={work.company}
                  className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none mt-1"
                />
              ) : (
                <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none mt-1" />
              )}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="font-semibold leading-none flex items-center gap-2">
                  {work.company}
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                </div>
                <div className="font-sans text-sm text-muted-foreground">
                  {work.title}
                </div>
                {work.description && (
                  <p className="font-sans text-xs text-muted-foreground mt-1">
                    {work.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
              <span>
                {work.start} - {work.end}
              </span>
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}
