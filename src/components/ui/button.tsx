import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // --- Princes brand variants ---
        // Olive gradient. The workhorse CTA.
        royal:
          "bg-[linear-gradient(145deg,#53634B_0%,#2C3627_100%)] text-[#F8F7F3] font-semibold border border-[rgba(232,211,153,0.12)] shadow-[0_2px_8px_-1px_rgba(44,54,39,0.3)] hover:bg-[linear-gradient(145deg,#5C6E53_0%,#354130_100%)] hover:shadow-[0_6px_18px_-3px_rgba(44,54,39,0.38)]",
        olive:
          "bg-[linear-gradient(145deg,#53634B_0%,#2C3627_100%)] text-[#F8F7F3] font-semibold border border-[rgba(232,211,153,0.12)] shadow-[0_2px_8px_-1px_rgba(44,54,39,0.3)] hover:bg-[linear-gradient(145deg,#5C6E53_0%,#354130_100%)] hover:shadow-[0_6px_18px_-3px_rgba(44,54,39,0.38)]",
        // Gold gradient. Scarce by design: reserved for the single primary
        // conversion action on a page. Never more than one per viewport.
        gold:
          "bg-[linear-gradient(135deg,#E8D399_0%,#C5A869_100%)] text-[#181512] font-semibold border border-[rgba(161,133,72,0.3)] shadow-[0_2px_8px_-1px_rgba(197,168,105,0.25)] hover:bg-[linear-gradient(135deg,#F3E2B3_0%,#D4B877_100%)] hover:shadow-[0_6px_18px_-2px_rgba(197,168,105,0.4)]",
        // Hairline outline for use on dark/photographic grounds.
        ghostGold:
          "border border-[rgba(232,211,153,0.45)] text-[#F3F3ED] bg-white/5 backdrop-blur-sm hover:bg-white/12 hover:border-[rgba(232,211,153,0.75)]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        xl: "h-12 rounded-full px-8 text-[0.9375rem] has-[>svg]:px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
