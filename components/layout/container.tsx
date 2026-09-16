import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

/** Shared page container so every section lines up on the same edges. */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10", className)}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
