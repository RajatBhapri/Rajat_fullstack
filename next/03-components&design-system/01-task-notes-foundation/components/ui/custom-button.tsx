import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

const customButtonVariants = cva(
  "relative overflow-hidden transition-all duration-200",
  {
    variants: {
      intent: {
        success: "bg-green-600 text-white hover:bg-green-700",
        warning: "bg-yellow-600 text-white hover:bg-yellow-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      glow: {
        true: "shadow-lg hover:shadow-xl",
        false: "",
      },
    },
    defaultVariants: {
      glow: false,
    },
  },
);

interface CustomButtonProps
  extends ButtonProps, VariantProps<typeof customButtonVariants> {}

export function CustomButton({
  className,
  intent,
  glow,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={cn(customButtonVariants({ intent, glow }), className)}
      {...props}
    />
  );
}
