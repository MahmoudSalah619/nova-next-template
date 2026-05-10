import React from 'react';
import styles from './Button.module.css';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          isLoading && styles.loading,
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? <span className={styles.spinner} /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
