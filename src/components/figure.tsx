import { cn } from "@/lib/utils";

export type FigureProps = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  className?: string;
  size?: "sm" | "md";
};

export function Figure({ src, alt, caption, credit, className, size = "md" }: FigureProps) {
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
      <figcaption className="px-3 py-2 font-mono text-[10px] leading-4 text-mist">
        {caption}
        <span className="block text-mist/70">{credit}</span>
      </figcaption>
    </figure>
  );
}
