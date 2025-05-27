import React, { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
        primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 active:from-primary-700 active:to-primary-800",
        secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 active:from-secondary-700 active:to-secondary-800",
        accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 active:from-accent-700 active:to-accent-800",
        outline: "border border-white text-white hover:bg-white/10 active:bg-white/20",
        outlineDark: "border border-gray-800 text-gray-800 hover:bg-gray-100 active:bg-gray-200",
        ghost: "bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-200",
        link: "text-primary-600 underline-offset-4 hover:underline",
        glass: "bg-white/20 backdrop-blur-md text-white hover:bg-white/30 active:bg-white/40 border border-white/30",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 px-2 text-xs rounded",
        sm: "h-8 px-3 text-sm rounded",
        lg: "h-12 px-6 text-base rounded-md",
        xl: "h-14 px-8 text-lg rounded-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";