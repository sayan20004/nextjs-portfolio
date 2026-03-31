import ExperienceEditor from "@/components/dashboard/ExperienceEditor";

export default function NewExperiencePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="title text-3xl">Add Experience/Education</h1>
      <ExperienceEditor />
    </div>
  );
}
