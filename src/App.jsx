import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import { useLenis } from "./hooks/useLenis";
import useIsDesktop from "./hooks/useIsDesktop";
import LazySection from './components/LazySection';
import Home from "./components/Home";
import SectionLoader from "./components/SectionLoader";

const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
const Project = lazy(() => import("./components/Project"));
const Work = lazy(() => import("./components/Work"));
const Model3D = lazy(() => import("./components/Model3D"));

const Section = ({ id, className, children }) => (
  <section
    id={id}
    className={`py-16 md:py-24 w-full ${className || ""}`}
  >
    {children}
  </section>
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
  const isDesktop = useIsDesktop();

  return (
    <Suspense fallback={<SectionLoader />}>
      <div className="text-white min-h-screen relative w-full overflow-x-hidden bg-dark-800">
        {/* Background 3D model - only render on desktop */}
        {isDesktop && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Model3DErrorBoundary>
            <Suspense fallback={null}>
              <Model3D />
            </Suspense>
          </Model3DErrorBoundary>
        </div>
        )}

        {/* Overlay gradient to improve contrast with background */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-dark-800/80 to-dark-900/90 pointer-events-none" />

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />

          <AnimatePresence mode="wait">
            {/* Home section loads instantly */}
            <Section id="home">
              <Home />
            </Section>

            {/* Lazy-loaded sections */}
            <LazySection id="skills" className="bg-dark-900/30">
              <Skills />
            </LazySection>

            <LazySection id="work">
              <Work />
            </LazySection>

            <LazySection id="project" className="bg-dark-900/30">
              <Project />
            </LazySection>

            <LazySection id="contact">
              <Contact />
            </LazySection>
          </AnimatePresence>
        </div>
      </div>
    </Suspense>
  );
};

export default App;
