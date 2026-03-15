"use client";

import { motion } from "framer-motion";
import { TaskCard } from "./TaskCard";
import type { Task } from "@/lib/types";

interface AnimatedTaskCardProps {
  task: Task;
  index: number;
  compact?: boolean;
  onToggleComplete: (taskId: string) => void;
}

export function AnimatedTaskCard({
  task,
  index,
  compact = false,
  onToggleComplete,
}: AnimatedTaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      layout
    >
      <TaskCard
        task={task}
        compact={compact}
        onToggleComplete={onToggleComplete}
      />
    </motion.div>
  );
}
