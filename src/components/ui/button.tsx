import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-sm font-semibold transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[25px] [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-[1.5s]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground rounded-[30px] shadow-[5px_5px_10px_rgba(0,0,0,0.116)] hover:bg-primary/90 hover:shadow-[5px_5px_15px_rgba(0,0,0,0.2)] active:scale-[0.97] hover:[&_svg]:rotate-[250deg] pl-2 pr-4",
        hero: "bg-primary text-primary-foreground rounded-[30px] shadow-[5px_5px_10px_rgba(0,0,0,0.116)] hover:bg-primary/90 hover:shadow-[5px_5px_15px_rgba(0,0,0,0.2)] active:scale-[0.97] hover:[&_svg]:rotate-[250deg] pl-2 pr-4",
        secondary: "bg-secondary text-secondary-foreground rounded-[30px] shadow-[5px_5px_10px_rgba(0,0,0,0.116)] hover:bg-secondary/90 hover:shadow-[5px_5px_15px_rgba(0,0,0,0.2)] active:scale-[0.97] hover:[&_svg]:rotate-[250deg] pl-2 pr-4",
        outline: "border-2 border-primary/50 bg-card/50 backdrop-blur-sm text-foreground rounded-[30px] hover:bg-primary/10 hover:border-primary active:scale-[0.97] hover:[&_svg]:rotate-[250deg] pl-2 pr-4",
        ghost: "text-foreground hover:bg-muted/50 hover:text-primary rounded-[30px] active:scale-[0.97]",
        destructive: "bg-destructive text-destructive-foreground rounded-[30px] shadow-md hover:bg-destructive/90 active:scale-[0.97]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 py-1.5 text-xs",
        lg: "h-12 px-6 py-3 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
