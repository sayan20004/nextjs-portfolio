import SocialEditor from "@/components/dashboard/SocialEditor";
import dbConnect from "@/lib/db";
import { Social } from "@/lib/models";
import { notFound } from "next/navigation";

export default async function EditSocialPage({ params }: { params: { id: string } }) {
  await dbConnect();
  
  let social;
  try {
    social = await Social.findById(params.id).lean();
  } catch (e) {
    social = null;
  }
  
  if (!social) notFound();

  const serializedSocial = JSON.parse(JSON.stringify(social));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="title text-3xl">Edit Social Link</h1>
      <SocialEditor socialToEdit={serializedSocial} />
    </div>
  );
}
