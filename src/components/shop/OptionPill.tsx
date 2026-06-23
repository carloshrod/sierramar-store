import { cn } from "@/lib/utils/index";

interface OptionPillProps {
  label: string;
  isSelected: boolean;
  isDisabled: boolean;
  isSoldOut: boolean;
  onClick: () => void;
  size?: "default" | "sm";
}

const sizeClasses: Record<"default" | "sm", string> = {
  default: "px-4 py-2 text-sm",
  sm: "px-3 py-1 text-xs",
};

export function OptionPill({
  label,
  isSelected,
  isDisabled,
  isSoldOut,
  onClick,
  size = "default",
}: OptionPillProps) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-pressed={isSelected}
      onClick={onClick}
      className={cn(
        "rounded-full border transition-colors cursor-pointer",
        sizeClasses[size],
        isSelected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-foreground/70 hover:border-foreground/30 hover:text-foreground",
        (isDisabled || isSoldOut) && "cursor-not-allowed opacity-40",
        isSoldOut && "line-through",
      )}
    >
      {label}
    </button>
  );
}
