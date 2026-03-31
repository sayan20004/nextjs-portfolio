import ExperienceEditor from "@/components/dashboard/ExperienceEditor";
import dbConnect from "@/lib/db";
import { Experience } from "@/lib/models";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
  await dbConnect();
  
  let exp;
  try {
    exp = await Experience.findById(params.id).lean();
  } catch (e) {
    exp = null;
  }
  
  if (!exp) notFound();

  const serializedExp = JSON.parse(JSON.stringify(exp));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="title text-3xl">Edit Experience/Education</h1>
      <ExperienceEditor experienceToEdit={serializedExp} />
    </div>
  );
}
