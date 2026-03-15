"use client";

import { motion } from "framer-motion";

export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="rounded-full border-2 border-[hsl(var(--primary))] border-t-transparent"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}