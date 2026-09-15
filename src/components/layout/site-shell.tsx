import { useRouterState } from "@tanstack/react-router";
import { Header } from "./header";
import { Footer } from "./footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLab = pathname.startsWith("/lab/");
  return (
    <div className="min-h-dvh bg-void text-chalk">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-glacier focus:px-4 focus:py-2 focus:text-basalt"
      >
        Skip to content
      </a>
      <Header variant={isLab ? "lab" : "default"} />
      {children}
      {!isLab && <Footer />}
    </div>
  );
}
