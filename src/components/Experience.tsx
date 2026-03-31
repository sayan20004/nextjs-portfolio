import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Timeline from "./Timeline";
import dbConnect from "@/lib/db";
import { Experience as ExperienceModel } from "@/lib/models";

export default async function Experience() {
  await dbConnect();
  // Reverse to get newest first
  const experiences = await ExperienceModel.find().lean();
  
  const career = experiences.filter((e: any) => e.type === "work").reverse();
  const education = experiences.filter((e: any) => e.type === "education").reverse();

  return (
    <Tabs defaultValue="work">
      <TabsList className="mb-2 grid w-full grid-cols-2">
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>
      <TabsContent value="work">
        <Timeline experience={career as any}></Timeline>
      </TabsContent>
      <TabsContent value="education">
        <Timeline experience={education as any}></Timeline>
      </TabsContent>
    </Tabs>
  );
}
