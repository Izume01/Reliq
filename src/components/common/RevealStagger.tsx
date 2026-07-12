"use client";
import { motion, useReducedMotion } from "motion/react";
import { ReactNode, Children, isValidElement } from "react";

export default function RevealStagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const childrenArray = Children.toArray(children).filter(isValidElement);
  return (
    <div className={className}>
      {childrenArray.map((child, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
