
import { useEffect, useRef } from "react";

function useSectionParallax(intensity = 1) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (motionPreference.matches) return;

    let animationFrame = null;

    const updateParallax = () => {
      animationFrame = null;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Shared movement calculation for every section
      const distance =
        rect.top + rect.height / 2 - viewportHeight / 2;

      const progress = Math.max(
        -1,
        Math.min(1, distance / (viewportHeight * 1.2))
      );

      const mobileIntensity =
        window.innerWidth <= 700 ? 0.55 : 1;

      const strength = intensity * mobileIntensity;

      // Different speeds create the depth effect
      section.style.setProperty(
        "--parallax-slow",
        `${progress * -25 * strength}px`
      );

      section.style.setProperty(
        "--parallax-medium",
        `${progress * -48 * strength}px`
      );

      section.style.setProperty(
        "--parallax-fast",
        `${progress * -75 * strength}px`
      );

      section.style.setProperty(
        "--parallax-content",
        `${progress * 18 * strength}px`
      );

      section.style.setProperty(
        "--parallax-rotation",
        `${progress * 4 * strength}deg`
      );
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate);

    requestUpdate();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [intensity]);

  return sectionRef;
}

export default useSectionParallax;
