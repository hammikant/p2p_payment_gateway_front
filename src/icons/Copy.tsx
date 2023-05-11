import React from 'react';

export const Copy = ({color}: {color: string}) => {
    return (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M24.6923 12H14.3077C13.0332 12 12 13.0332 12 14.3077V24.6923C12 25.9668 13.0332 27 14.3077 27H24.6923C25.9668 27 27 25.9668 27 24.6923V14.3077C27 13.0332 25.9668 12 24.6923 12Z"
                stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M8.46154 20H7.30769C6.69565 20 6.10868 19.7569 5.67591 19.3241C5.24313 18.8913 5 18.3043 5 17.6923V7.30769C5 6.69565 5.24313 6.10868 5.67591 5.67591C6.10868 5.24313 6.69565 5 7.30769 5H17.6923C18.3043 5 18.8913 5.24313 19.3241 5.67591C19.7569 6.10868 20 6.69565 20 7.30769V8.46154"
                stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};
