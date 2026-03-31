import ProjectEditor from "@/components/dashboard/ProjectEditor";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="title text-3xl">New Project</h1>
      <ProjectEditor />
    </div>
  );
}
