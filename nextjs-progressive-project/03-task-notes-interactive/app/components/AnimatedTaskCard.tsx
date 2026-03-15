"use client";

import { motion } from "framer-motion";
import { TaskCard } from "./TaskCard";
import type { Task } from "@/lib/types";

interface AnimatedTaskCardProps {
  task: Task;
  index: number;
  compact?: boolean;
  isBusy?: boolean;
  isSelected?: boolean;
  isDragging?: boolean;
  onSelect?: (taskId: string, checked: boolean) => void;
  onToggleComplete: (taskId: string) => void;
  onDelete: (task: Task) => void;
  onDragStart: (taskId: string) => void;
  onDragOver: (taskId: string) => void;
  onDrop: () => void;
}

export function AnimatedTaskCard({
  task,
  index,
  compact = false,
  isBusy = false,
  isSelected = false,
  isDragging = false,
  onSelect,
  onToggleComplete,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}: AnimatedTaskCardProps) {
  return (
    <motion.div
      draggable
      onDragStart={() => onDragStart(task.id)}
      onDragOver={(event) => {
        event.preventDefault();
        onDragOver(task.id);
      }}
      onDrop={(event) => {
        event.preventDefault();
        onDrop();
      }}
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
      className="cursor-grab active:cursor-grabbing"
    >
      <TaskCard
        task={task}
        compact={compact}
        isBusy={isBusy}
        isSelected={isSelected}
        isDragging={isDragging}
        onSelect={onSelect}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    </motion.div>
  );
}
