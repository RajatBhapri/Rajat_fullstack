"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

interface TaskStatusToggleProps {
  completed: boolean;
  onToggle: () => void;
}

export function TaskStatusToggle({
  completed,
  onToggle,
}: TaskStatusToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-sm transition-all duration-200 hover:bg-[hsl(var(--accent))]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {completed ? (
          <motion.span
            key="done"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 text-green-600"
          >
            <CheckCircle2 className="h-4 w-4" />
            Completed
          </motion.span>
        ) : (
          <motion.span
            key="pending"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 text-amber-600"
          >
            <Circle className="h-4 w-4" />
            Pending
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}