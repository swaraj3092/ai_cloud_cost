import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full blur-[100px] bg-primary/10"
      animate={{
        x: mousePosition.x - 300,
        y: mousePosition.y - 300,
      }}
      transition={{ type: "tween", ease: "circOut", duration: 0.4 }}
    />
  );
}
