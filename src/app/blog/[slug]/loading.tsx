// Change "export function Loading()" to "export default function Loading()"
export default function Loading() {
  return (
    <article className="mt-8 flex animate-pulse flex-col gap-8 pb-16">
      <section className="flex flex-col gap-4">
        <div className="h-12 w-3/4 rounded-md bg-muted"></div>
        <div className="h-6 w-full rounded-md bg-muted"></div>
        <div className="h-10 w-1/2 rounded-md bg-muted"></div>
      </section>
      <div className="h-80 w-full rounded-lg bg-muted"></div>
      <section className="flex flex-col gap-4">
        <div className="h-6 w-full rounded-md bg-muted"></div>
        <div className="h-6 w-5/6 rounded-md bg-muted"></div>
        <div className="h-6 w-full rounded-md bg-muted"></div>
      </section>
    </article>
  );
}