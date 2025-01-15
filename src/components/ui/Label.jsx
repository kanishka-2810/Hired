import React from "react";
import { cn } from "@/lib/utils"; // Ensure this utility exists for conditional classNames

export const Label = React.forwardRef(({ className, htmlFor, ...props }, ref) => (
  <label
    ref={ref}
    htmlFor={htmlFor}
    className={cn(
      "block text-sm font-medium text-gray-700 dark:text-gray-400", // Base styles
      className // Custom styles passed as props
    )}
    {...props}
  />
));

Label.displayName = "Label";
