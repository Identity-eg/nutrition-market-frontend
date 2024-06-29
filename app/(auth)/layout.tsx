import type { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-[70vh] h-full media-md:flex media-md:justify-center media-md:items-center py-12">
      {children}
    </section>
  );
}
