import { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-10 h-10 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
  </div>
);

const LazySection = ({ id, className, children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px', // Load when 200px away from viewport
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-16 md:py-24 w-full ${className || ''}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Suspense fallback={<SectionLoader />}>
        {inView ? children : <SectionLoader />}
      </Suspense>
    </motion.section>
  );
};

LazySection.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default LazySection;
