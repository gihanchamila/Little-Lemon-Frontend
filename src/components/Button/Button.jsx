import React from 'react';

const Button = ({ type = 'primary', className = '', outline = false, children, ...buttonProps }) => {
  const baseClassName = type === 'primary' ? 'primaryButton' : 'secondaryButton';
  const outlineClassName = outline ? 'outlineButton' : '';

  
  
  const combinedClassName = `button ${baseClassName} ${outlineClassName} ${className}`.trim();

  return (
    <button role="button" className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
