"use client";

const colors = [
  { label: "Blue", value: "221 83% 53%" },
  { label: "Violet", value: "262 83% 58%" },
  { label: "Green", value: "142 71% 45%" },
  { label: "Orange", value: "24 95% 53%" },
  { label: "Pink", value: "330 81% 60%" },
];

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => {
        const active = value === color.value;

        return (
          <button
            key={color.value}
            type="button"
            onClick={() => onChange(color.value)}
            className={`h-10 w-10 rounded-full border-2 transition-transform duration-200 hover:scale-110 ${
              active
                ? "border-[hsl(var(--foreground))]"
                : "border-[hsl(var(--border))]"
            }`}
            style={{ backgroundColor: `hsl(${color.value})` }}
            aria-label={`Select ${color.label}`}
            title={color.label}
          />
        );
      })}
    </div>
  );
}