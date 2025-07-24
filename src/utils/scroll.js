// Utility function to scroll to sections using Lenis
export const scrollToSection = (sectionId, offset = -80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + offset;
    
    // Use Lenis scrollTo method if available, otherwise fallback to window.scrollTo
    if (window.lenis) {
      window.lenis.scrollTo(offsetPosition, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
};
