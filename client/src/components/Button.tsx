import React from 'react';

interface ButtonProps {
    value: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ value, onClick }) => {
    return (
        <button
            value={value}
            onClick={onClick}
            className="bg-interactive text-3xl drop-shadow-interactive"
        >
            {value}
        </button>
    );
};

export default Button;
