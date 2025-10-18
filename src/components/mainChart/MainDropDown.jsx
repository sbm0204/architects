import { useState } from 'react';
import './MainDropDown.css';

function MainDropDown({ title, options, onOptionSelect, variant, isOpen, toggleDropdown }) {
  
  const handleOptionClick = (option) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    }
    toggleDropdown(); // prop으로 받은 toggleDropdown 호출
  };

  const dropdownClassName = `dropdown ${variant ? `dropdown-${variant}` : ''}`;

  return(
    <div className={dropdownClassName} onClick={toggleDropdown}>
      <span className="dropdown-title">{title}</span>
       <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAk0lEQVR4AexRgQmAMAwbXuIpeol6iaeol+gpnmIyHAzpuiEoDCqNSJOmJTbuw8fMxXAtlvpiacWT76b2Qzm4Q9cBUpFfQKR4p5mfGJyAGXgaBOMN3AGIpZlzQFoQG68UpZAz51y8YESDUfBi1Rg6NRbyAWHBgEaRMXTF5tRyQY+P7MXQ+CqJxQvfvMxcTM1i+T+WCwAA//+da/46AAAABklEQVQDANDhEy/yKBSrAAAAAElFTkSuQmCC" 
        alt="toggle-dropdown" 
        className='dropdown-icon'/>
     {isOpen && (
       <div className="dropdown-content"> 
        {options.map((option, index) => (
          <a key={index} href='#' onClick={() => handleOptionClick(option)}>{option}</a>
        ))}
      </div>
     )}
    </div>    
  ); 
}

export default MainDropDown;
