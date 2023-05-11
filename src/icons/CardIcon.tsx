import React from 'react';

export const CardIcon = ({color}:{color: string}) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.4 4H3.6C2.71634 4 2 4.76751 2 5.71429V14.2857C2 15.2325 2.71634 16 3.6 16H16.4C17.2837 16 18 15.2325 18 14.2857V5.71429C18 4.76751 17.2837 4 16.4 4Z"
                stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 8H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 13H8" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>

    );
}; 
