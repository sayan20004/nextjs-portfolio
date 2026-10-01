/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

export default function HackathonsSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm font-medium">
              Hackathons
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              I love building things
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[600px] mx-auto text-sm">
              Participating and organizing events, building projects under time limits, and working with developer communities.
            </p>
          </div>
        </div>
      </BlurFade>
      <div className="flex flex-col gap-6">
        {DATA.hackathons.map((hackathon, id) => (
          <BlurFade
            key={hackathon.title}
            delay={BLUR_FADE_DELAY * 14 + id * 0.05}
          >
            <div className="flex items-start gap-4 rounded-xl border border-border p-4 bg-card text-card-foreground">
              {hackathon.image && (
                <img
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="size-12 rounded-full border object-cover shrink-0"
                />
              )}
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-semibold text-base">{hackathon.title}</h3>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {hackathon.dates}
                  </span>
                </div>
                {hackathon.location && (
                  <span className="text-xs text-muted-foreground">
                    {hackathon.location}
                  </span>
                )}
                {hackathon.description && (
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {hackathon.description}
                  </p>
                )}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
