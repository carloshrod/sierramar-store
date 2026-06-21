import { cn } from "@/lib/utils/index";

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-330 px-6 sm:px-8 lg:px-10",
        className,
      )}
      {...props}
    />
  );
}
