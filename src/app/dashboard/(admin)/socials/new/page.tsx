import SocialEditor from "@/components/dashboard/SocialEditor";

export default function NewSocialPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="title text-3xl">Add Social Link</h1>
      <SocialEditor />
    </div>
  );
}
