import React from 'react';
import { clsx } from 'clsx';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = 'text', label, error, ...props }, ref) => {
        return (
            <div className={styles.container}>
                {label && (
                    <label className={styles.label} htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <div className={styles.inputWrapper}>
                    <input
                        type={type}
                        className={clsx(
                            styles.input,
                            error && styles.errorInput,
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
