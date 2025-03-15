import React from 'react';
import { clsx } from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={clsx(
                    styles.button,
                    styles[variant],
                    styles[size],
                    className
                )}
                disabled={props.disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <span className={styles.spinner} style={{ marginRight: '0.5rem' }}>
                        {/* Simple CSS spinner placeholder */}
                        ...
                    </span>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
