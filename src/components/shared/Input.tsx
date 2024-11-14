// src/shared/Input.tsx
import React, { FC } from 'react';

interface InputProps {
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any; // Allows additional props
}

const Input: FC<InputProps> = ({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <div className={`input-wrapper ${className}`}>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                {...props}
                className="input-field"
            />
        </div>
    );
};

export default Input;
