"use client";
import React, { forwardRef, useState, useEffect } from 'react';
import Icons from '@/assets/icons';

const Toast = forwardRef(({ message, type = 'default', onClose, duration = 5000 }, ref) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                onClose();
            }, 300); // Give time for fade-out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const getToastClasses = () => {
        const baseClasses = "max-w-xs text-sm font-semibold rounded-md shadow mb-3 transition-opacity duration-300";
        const visibilityClass = isVisible ? "opacity-100" : "opacity-0";

        let colorClasses = "bg-background text-foreground";

        switch (type) {
            case 'success':
                colorClasses = "bg-apeGreen-500 text-background";
                break;
            case 'error':
                colorClasses = "bg-apeRed-500 text-foreground";
                break;
            case 'warning':
                colorClasses = "bg-apeOrange-500 text-background";
                break;
            case 'info':
                colorClasses = "bg-apeBlue-500 text-foreground-100";
                break;
            case 'kick':
                colorClasses = "bg-kick-500 text-foreground-900";
                break;
            case 'twitch':
                colorClasses = "bg-twitch-500 text-foreground-100";
                break;
            default:
                colorClasses = "bg-background-400 text-foreground-500";
        }

        return `${baseClasses} ${colorClasses} ${visibilityClass}`;
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <div ref={ref} className={getToastClasses()} role="alert">
            <div className="flex p-2 pr-4">
                <div className="my-auto mr-auto pr-2">
                    <button
                        type="button"
                        className="inline-flex flex-shrink-0 justify-center items-center h-6 w-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-300 focus:ring-background-600 transition-all cursor-pointer"
                        onClick={handleClose}
                    >
                        <Icons.Ape size="2xl" className='translate-y-0.5' />
                    </button>
                </div>
                <span className="my-auto">
                {message}
                </span>
            </div>
        </div>
    );
});

Toast.displayName = 'Toast';

export default Toast;