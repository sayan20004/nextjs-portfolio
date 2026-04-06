import HomepageIntroEditor from "@/components/dashboard/HomepageIntroEditor";
import dbConnect from "@/lib/db";
import { HomepageIntro } from "@/lib/models";

export default async function HomepageIntroPage() {
  await dbConnect();
  
  let intro: any = await HomepageIntro.findOne({}).lean();
  
  // If no intro exists, provide defaults
  if (!intro) {
    intro = {
      name: "Your Name",
      title: "Your Title",
      bio: ["Bio line 1"],
      photo: "/profile.jpg",
      tagline: "",
      cvLink: "",
    };
  }

  const serializedIntro = JSON.parse(JSON.stringify(intro));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="title text-3xl">Homepage Introduction</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Edit your profile information displayed on the homepage
        </p>
      </div>
      <HomepageIntroEditor intro={serializedIntro} />
    </div>
  );
}
