// Label component extends from shadcnui - https://ui.shadcn.com/docs/components/label

"use client";
import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

// Define the Label component using forwardRef
const Label = React.forwardRef(
  (props, ref) => {
    const { className, ...restProps } = props;
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(
          "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...restProps}
      />
    );
  }
);

// Set displayName for debugging purposes
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
