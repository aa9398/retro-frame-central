import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-sm",
        outline:
          "border-2 border-pixel-border bg-background hover:bg-accent hover:text-accent-foreground rounded-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-sm",
        link: "text-primary underline-offset-4 hover:underline",
        
        // CineHub Custom Variants
        pixel: "bg-primary text-primary-foreground font-pixel text-xs uppercase tracking-wider border-2 border-primary hover:bg-background hover:text-primary hover:border-primary transition-all duration-200 shadow-pixel rounded-none",
        "retro-brick": "bg-retro-brick text-primary-foreground hover:bg-retro-brick/90 rounded-sm font-medium",
        "retro-olive": "bg-retro-olive text-primary-foreground hover:bg-retro-olive/90 rounded-sm font-medium",
        "retro-blue": "bg-retro-blue text-background hover:bg-retro-blue/90 rounded-sm font-medium",
        rating: "bg-rating-gold text-background font-pixel text-xs px-2 py-1 rounded-none border border-rating-gold/30",
        "watchlist": "border-2 border-dashed border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground rounded-sm font-medium",
        "purchase": "bg-gradient-retro text-foreground hover:opacity-90 rounded-sm font-medium shadow-card-retro"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1.5",
        lg: "h-12 px-8 py-3",
        icon: "h-10 w-10",
        pixel: "h-8 px-3 py-1.5",
        rating: "h-6 px-2 py-1"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
