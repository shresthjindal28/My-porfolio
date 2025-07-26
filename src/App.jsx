import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import { useLenis } from "./hooks/useLenis";

import Home from "./components/Home";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
const Project = lazy(() => import("./components/Project"));
const Work = lazy(() => import("./components/Work"));
const Model3D = lazy(() => import("./components/Model3D"));


// Component loading spinner
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-10 h-10 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
  </div>
);

const Section = ({ id, className, children }) => (
  <motion.section
    id={id}
    className={`py-16 md:py-24 w-full ${className || ""}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.section>
);

Section.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

// Error boundary for 3D model
class Model3DErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("3D Model error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return null; // Silently fail to not disrupt UI
    }
    return this.props.children;
  }
}

Model3DErrorBoundary.propTypes = {
  children: PropTypes.node,
};

const App = () => {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <Suspense fallback={<SectionLoader />}>
      <div className="text-white min-h-screen relative w-full overflow-x-hidden bg-dark-800">
        {/* Background 3D model - only render on desktop */}
        <div className="fixed inset-0 z-0 pointer-events-none hidden lg:block">
          <Model3DErrorBoundary>
            <Suspense fallback={null}>
              <Model3D />
            </Suspense>
          </Model3DErrorBoundary>
        </div>

        {/* Overlay gradient to improve contrast with background */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-dark-800/80 to-dark-900/90 pointer-events-none" />

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />

          <AnimatePresence mode="wait">
            {/* Home and Skills load instantly */}
            <Section id="home">
              <Home />
            </Section>

            <Section id="skills" className="bg-dark-900/60">
              <Skills />
            </Section>

            {/* Lazy load Work section */}
            <Suspense fallback={<SectionLoader />}>
              <Section id="work">
                <Work />
              </Section>
            </Suspense>

            {/* Lazy load Projects section */}
            <Suspense fallback={<SectionLoader />}>
              <Section id="projects" className="bg-dark-900/60">
                <Project />
              </Section>
            </Suspense>

            {/* Contact loads instantly */}
            <Section id="contact">
              <Contact />
            </Section>
            {/* Footer */}
            <footer className="py-8 text-center text-dark-300 text-sm">
              <p>
                © {new Date().getFullYear()} Shresth Jindal. All rights
                reserved.
              </p>
            </footer>
          </AnimatePresence>
        </div>
      </div>
    </Suspense>
  );
};

export default App;
