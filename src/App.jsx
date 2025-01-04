import React, { Suspense, lazy, memo } from 'react';
import Navbar from './components/Navbar';

// Optimized lazy loading with prefetch
const Home = lazy(() => import('./components/Home' /* webpackPrefetch: true */));
const Skills = lazy(() => import('./components/Skills' /* webpackPrefetch: true */));
const Contact = lazy(() => import('./components/Contact' /* webpackPrefetch: true */));
const Model3D = lazy(() => import('./components/Model3D' /* webpackPrefetch: true */));
const Experience = lazy(() => import('./components/Project' /* webpackPrefetch: true */));

const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
  </div>
));

const Section = memo(({ id, children }) => (
  <section id={id} className="w-full h-full">
    {children}
  </section>
));

const App = memo(() => {
  return (
    <div className="bg-gray-900 text-white min-h-screen relative w-full h-full overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<LoadingSpinner />}>
          <Model3D />
        </Suspense>
      </div>
      <div className="fixed inset-0 z-10 bg-gray-900/70" />
      <div className="relative z-20">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Section id="home">
            <Home />
          </Section>
          <Section id="skills">
            <Skills />
          </Section>
          <Section id="experience">
            <Experience />
          </Section>
          <Section id="contact">
            <Contact />
          </Section>
        </Suspense>
      </div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
Section.displayName = 'Section';
App.displayName = 'App';
export default App;
