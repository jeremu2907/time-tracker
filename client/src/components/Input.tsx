import React from 'react';

interface InputProps {
    type: string;
    size?: string;
    styleString?: string;
    value?: string;
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
    name?: string
}

const Input: React.FC<InputProps> = ({ type, size, styleString, value, onChange, name }) => {
    return (
        <input
            type={type}
            onChange={onChange}
            value={value}
            className={`border-b p-4 bg-transparent ${size === 'xl' ? 'text-3xl' : ''} ${styleString}`}
            name={name??undefined}
        />
    );
};

export default Input;
