import Icon from "./Icon";
import dbConnect from "@/lib/db";
import { Social as SocialModel } from "@/lib/models";

export default async function Socials() {
  await dbConnect();
  const socials = await SocialModel.find().sort({ order: 1 }).lean();

  return (
    <section className="flex gap-6">
      {socials.map((item: any) => (
        <a
          href={item.href}
          key={item._id.toString()}
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
          rel="noopener noreferrer"
          title={item.name}
        >
          <span className="sr-only">{item.name}</span>
          <Icon name={item.icon} aria-hidden="true" className="size-5" />
        </a>
      ))}
    </section>
  );
}
