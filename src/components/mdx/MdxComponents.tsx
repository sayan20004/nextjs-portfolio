import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export const MdxComponents = {
  h1: (props: any) => (
    <h1 className="title text-4xl" {...props}>
      <Balancer>{props.children}</Balancer>
    </h1>
  ),
  h2: (props: any) => (
    <h2 className="title text-3xl" {...props}>
      <Balancer>{props.children}</Balancer>
    </h2>
  ),
  h3: (props: any) => (
    <h3 className="title text-2xl" {...props}>
      <Balancer>{props.children}</Balancer>
    </h3>
  ),
  a: (props: any) => (
    <Link
      className="font-medium text-primary underline underline-offset-4"
      {...props}
    />
  ),
  img: (props: any) => (
    <Image
      className="rounded-lg border shadow-md"
      alt={props.alt || "Blog post image"}
      width={700}
      height={400}
      {...props}
    />
  ),
  Image: (props: any) => (
    <Image
      className="rounded-lg border shadow-md"
      alt={props.alt || "Blog post image"}
      width={700}
      height={400}
      {...props}
    />
  ),
  // Add other components like code blocks, blockquotes, etc.
  pre: (props: any) => (
    <pre
      className="overflow-x-auto rounded-lg border bg-muted p-4 shadow-sm"
      {...props}
    />
  ),
};