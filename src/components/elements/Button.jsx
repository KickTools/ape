// src/components/elements/Button.js

import React from 'react';

const Button = ({
  children,
  color = 'apeRed',
  textColor = 'text-foreground',
  size = 'medium',
  radius,
  variant = 'default', // Added variant prop
  ...rest
}) => {
  let fontSize;
  let padding;
  let borderRadius;
  let buttonClasses;

  // Size Mapping (Tailwind-compatible)
  switch (size) {
    case 'small':
      fontSize = 'text-sm';
      padding = 'px-3 py-2';
      break;
    case 'large':
      fontSize = 'text-lg';
      padding = 'px-6 py-3';
      break;
    default: // medium
      fontSize = 'text-base';
      padding = 'px-6 py-3';
      break;
  }

  borderRadius = radius === 'md' ? 'rounded-md' : 'rounded-full';

  if (variant === 'text') {
    buttonClasses = `
      text-${textColor}
      font-medium
      underline
      ${padding}
      hover:scale-105
      cursor-pointer
      ${fontSize}
    `;
  } else {
    buttonClasses = `
      bg-${color}
      text-${textColor}
      font-bold
      ${padding}
      ${borderRadius}
      transition
      hover:shadow-${color}/20
      hover:shadow-lg
      hover:scale-105
      cursor-pointer
      ${fontSize}
    `;
  }

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;