import Link from "next/link";
import { Button } from "@/components/ui/Button";
import dbConnect from "@/lib/db";
import { Experience } from "@/lib/models";
import DeleteExperienceButton from "@/components/dashboard/DeleteExperienceButton";

export default async function ExperienceAdminPage() {
  await dbConnect();
  const experiences = await Experience.find().sort({ start: -1 }).lean();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="title text-3xl">Experience & Education</h1>
        <Button asChild>
          <Link href="/dashboard/experience/new">Add New</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {experiences.map((exp: any) => (
          <div key={exp._id.toString()} className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{exp.name}</h3>
                <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full capitalize">
                  {exp.type}
                </span>
              </div>
              <p className="text-sm text-foreground">{exp.title}</p>
              <p className="text-xs text-muted-foreground">{exp.start} - {exp.end || "Present"}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/experience/${exp._id.toString()}`}>Edit</Link>
              </Button>
              <DeleteExperienceButton id={exp._id.toString()} />
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <p className="text-muted-foreground">No records found. Create one to get started.</p>
        )}
      </div>
    </div>
  );
}
