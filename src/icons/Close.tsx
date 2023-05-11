import React from 'react';

export const Close = ({width, height, color}: { width: string, height: string, color: string }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none">
            <path d="M8 24L24 8M8 8L24 24" stroke={color} strokeWidth="1.4" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};
