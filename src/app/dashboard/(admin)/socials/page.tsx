import Link from "next/link";
import { Button } from "@/components/ui/Button";
import dbConnect from "@/lib/db";
import { Social } from "@/lib/models";
import DeleteSocialButton from "@/components/dashboard/DeleteSocialButton";

export default async function SocialAdminPage() {
  await dbConnect();
  const socials = await Social.find().sort({ order: 1 }).lean();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="title text-3xl">Social Links</h1>
        <Button asChild>
          <Link href="/dashboard/socials/new">Add New</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {socials.map((social: any) => (
          <div key={social._id.toString()} className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{social.name}</h3>
                <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full capitalize">
                  Order: {social.order}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{social.href}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/socials/${social._id.toString()}`}>Edit</Link>
              </Button>
              <DeleteSocialButton id={social._id.toString()} />
            </div>
          </div>
        ))}
        {socials.length === 0 && (
          <p className="text-muted-foreground">No social links found. Create one to get started.</p>
        )}
      </div>
    </div>
  );
}
