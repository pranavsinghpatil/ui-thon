
import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Nav } from "@/components/nav";
import { motion } from "framer-motion";
import { CustomCursor } from "@/components/cursor";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

export function Layout({ children }: PropsWithChildren) {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <Nav />
      <motion.main
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex-1"
      >
        {children}
      </motion.main>
      <footer className="py-8 border-t">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} name.dev. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
