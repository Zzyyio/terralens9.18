import { cn } from "@/lib/utils";

export type FigureProps = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  className?: string;
  size?: "sm" | "md";
  id?: string;
};

function figureId(src: string, caption: string): string {
  const fromSrc = src.replace(/^.*\//, "").replace(/\.[a-z0-9]+$/i, "");
  const slug = (fromSrc || caption)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `fig-${slug}`;
}

export function Figure({ src, alt, caption, credit, className, size = "md", id }: FigureProps) {
  const capId = id ?? figureId(src, caption);
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[12px] border border-white/10 bg-void",
        size === "sm" ? "my-2" : "my-3",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn("w-full object-cover", size === "sm" ? "max-h-36" : "max-h-52")}
        loading="lazy"
      />
      <figcaption id={capId} className="px-3 py-2 font-mono text-[10px] leading-4 text-mist">
        {caption}
        <span className="block text-mist/70">{credit}</span>
      </figcaption>
    </figure>
  );
}
