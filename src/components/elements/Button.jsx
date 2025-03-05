// src/components/elements/Button.js

import React from 'react';

const Button = ({
  children,
  color = 'apeRed',
  textColor = 'text-foreground',
  size = 'medium',
  radius,
  ...rest
}) => {
  let fontSize;
  let padding;
  const borderRadius = radius === 'md' ? 'rounded-md' : 'rounded-full';

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
      padding = 'px-6 py-3'; //Using the same padding as the default className
      break;
  }

  const buttonClasses = `
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

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;