"use client";

import { AnimatePresence, motion, UseInViewOptions, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  characterDelay?: number;
  animateByCharacter?: boolean;
}

export default function BlurFadeText({
  text,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 8,
  characterDelay = 0.03,
  animateByCharacter = false,
}: BlurFadeTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: "blur(8px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };
  const combinedVariants = variant || defaultVariants;

  if (animateByCharacter) {
    const characters = Array.from(text);
    return (
      <div ref={ref} className={cn("flex flex-wrap", className)}>
        <AnimatePresence>
          {characters.map((char, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              exit="hidden"
              variants={combinedVariants}
              transition={{
                delay: delay + i * characterDelay,
                duration,
                ease: "easeOut",
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          exit="hidden"
          variants={combinedVariants}
          transition={{
            delay: 0.04 + delay,
            duration,
            ease: "easeOut",
          }}
        >
          {text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
