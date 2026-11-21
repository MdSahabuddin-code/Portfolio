
import { useEffect, useRef } from "react";
import "../styles/cursor-glow.css";

function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;

    if (!glow) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const finePointer = window.matchMedia("(pointer: fine)");

    if (reducedMotion.matches || !finePointer.matches) return;

    let animationFrame = null;
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      glow.style.setProperty("--cursor-x", `${currentX}px`);
      glow.style.setProperty("--cursor-y", `${currentY}px`);

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationFrame = null;
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") return;

      targetX = event.clientX;
      targetY = event.clientY;

      glow.classList.add("cursor-glow-visible");

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const handlePointerLeave = () => {
      glow.classList.remove("cursor-glow-visible");
    };

    window.addEventListener("pointermove", handlePointerMove);

    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="global-cursor-glow"
      aria-hidden="true"
    />
  );
}

export default CursorGlow;
