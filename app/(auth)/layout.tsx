import type { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-[70vh] media-md:flex media-md:justify-center media-md:items-center pt-10 media-md:pt-0">
      {children}
    </section>
  );
}
