import React from 'react'

const Button = ({type, className, children, ...buttonProps}) => {
    
    const baseClassName = type === 'primary' ? "primaryButton" : "secondaryButton";
    const combinedClassName = `${baseClassName} ${className || ''}`;
  
    return (
      <button role='button' className={`button ${combinedClassName}`} {...buttonProps}>
        {children}
      </button>
    );
}

export default Button