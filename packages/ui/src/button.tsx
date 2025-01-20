"use client";

import { ReactNode } from "react";

const buttonVariants = 
    {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    
  }

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size: "default" | "sm" | "lg" | "icon";
  onClick? : () => void;
}


export const Button = ({ children, className, variant, size, onClick }: ButtonProps) => {
  return (
    <button
      className={`${className} buttonVariants.variant[${variant}] buttonVariants.size[${size}]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
