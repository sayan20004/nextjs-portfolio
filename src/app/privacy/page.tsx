import Link from "next/link";

const lastUpdated = "Apr 2025";

export default function page() {
  return (
    <article className="prose mt-8 pb-16 dark:prose-invert">
      <div className="space-y-4">
        <h1 className="title text-5xl">privacy policy.</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      <div className="space-y-4">
        <h2 className="title text-3xl">Hey, Welcome!</h2>
        <p>
          Thanks for visiting! This <b>Privacy Policy</b> explains how your data
          is handled on this site. My portfolio and content spaces like Triopedia
          are meant to inform and inspire—not to collect personal data.
        </p>

        <h2 className="title">What Information I Collect (Spoiler: Very Little)</h2>
        <p>
          This website is primarily static. There are no user accounts,
          tracking cookies, or shady analytics. It&apos;s just my work, showcased cleanly.
        </p>

        <h3>1. Chatbot Conversations</h3>
        <p>
          If you interact with my AI chatbot, your message may be temporarily cached
          or stored for improving the experience. Please avoid entering sensitive info—
          the bot&apos;s cool, but not a vault.
        </p>

        <h3>2. Contact Info</h3>
        <p>
          If you reach out via the contact form or email, I&apos;ll only use your info
          to reply. I don&apos;t do spam or weird follow-ups—just genuine responses.
        </p>

        <h2 className="title">How I Use Any Info</h2>
        <p>
          On the rare occasion that info is collected, here&apos;s what it may be used for:
        </p>
        <ul>
          <li>Keeping the site running well and improving it</li>
          <li>Fixing bugs or issues you report</li>
          <li>Having meaningful conversations with you</li>
        </ul>

        <h2 className="title">Sharing Your Info (I Don&apos;t)</h2>
        <p>
          I don&apos;t sell, rent, or trade any personal information. If you share something
          sensitive by accident, you can always reach out to get it removed.
        </p>

        <h2 className="title">Security (Let&apos;s Be Honest)</h2>
        <p>
          I do my best to keep things safe, but no system is 100% secure. If there&apos;s
          any breach (unlikely), I&apos;ll be transparent and do what I can to fix it fast.
        </p>

        <h2 className="title">Policy Updates</h2>
        <p>
          This policy was last updated on <b>{lastUpdated}</b>. Any changes will be posted
          right here, with a clear explanation. No fine print, no surprises.
        </p>

        <h2 className="title">Have Questions?</h2>
        <p>
          Whether it&apos;s a privacy concern or just a hello, feel free to reach out at{" "}
          <Link href="mailto:sayanmaity600@gmail.com">sayanmaity600@gmail.com</Link>{" "}
          or drop a message via the{" "}
          <Link href="/contact">contact form</Link>. I&apos;m always open to chat.
        </p>
      </div>
    </article>
  );
}
