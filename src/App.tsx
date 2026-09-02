import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Preloader } from "@/components/preloader/Preloader";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Navbar } from "@/components/navigation/Navbar";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { SectionRail } from "@/components/navigation/SectionRail";
import { Home } from "@/pages/Home";
import { useLenis } from "@/lib/useLenis";
import { useReducedMotion } from "@/lib/useMedia";
import { useUIStore } from "@/store/useUIStore";
import { ScrollTrigger } from "@/lib/gsap";
import { stopScroll, startScroll } from "@/lib/lenisSingleton";

const Scene = lazy(() => import("@/three/Scene").then((m) => ({ default: m.Scene })));
const ProjectDetail = lazy(() =>
  import("@/pages/ProjectDetail").then((m) => ({ default: m.ProjectDetail })),
);

function ScrollRefreshOnRouteChange() {
  const location = useLocation();
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);
  return null;
}

function HomeOnlyRail() {
  const location = useLocation();
  if (location.pathname !== "/") return null;
  return <SectionRail />;
}

export default function App() {
  const isLoading = useUIStore((s) => s.isLoading);
  const reducedMotion = useReducedMotion();
  useLenis(!reducedMotion);

  useEffect(() => {
    if (isLoading) {
      stopScroll();
    } else {
      startScroll();
    }
  }, [isLoading]);

  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded focus:bg-(--color-accent) focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-(--color-bg)"
      >
        Skip to content
      </a>

      {isLoading && <Preloader />}

      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <CustomCursor />
      <Navbar />
      <MobileMenu />
      <HomeOnlyRail />
      <ScrollRefreshOnRouteChange />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/work/:slug"
            element={
              <Suspense fallback={null}>
                <ProjectDetail />
              </Suspense>
            }
          />
        </Routes>
      </main>
    </>
  );
}
