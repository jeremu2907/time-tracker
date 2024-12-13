import React from 'react';

interface ButtonProps {
    role?: string;
    value: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    styles?: string
}

const Button: React.FC<ButtonProps> = ({ role, value, onClick, styles }) => {
    return (
        <button
            value={value}
            onClick={onClick}
            role={role??undefined}
            className={`bg-interactive text-3xl drop-shadow-interactive ${styles}`}
        >
            {value}
        </button>
    );
};

export default Button;
