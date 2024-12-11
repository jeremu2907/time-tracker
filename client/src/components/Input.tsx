import React from 'react';

interface InputProps {
    type: string;
    size?: string;
    styleString?: string;
    value?: string;
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, size, styleString, value, onChange }) => {
    return (
        <input
            type={type}
            onChange={onChange}
            value={value}
            className={`border-b p-4 bg-transparent ${size === 'xl' ? 'text-3xl' : ''} ${styleString}`}
        />
    );
};

export default Input;
