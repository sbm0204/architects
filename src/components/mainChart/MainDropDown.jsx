import { useState } from 'react';
import './MainDropDown.css';

function MainDropDown({ title, options, onOptionSelect }) {
  // 드롭다운 메뉴의 보임 상태를 관리하는 state 
  const [isOpen, setIsOpen] = useState(false);
  
  // 드롭다운 메뉴 열기/닫기 토글 함수 
  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState); // 상태 반전  
  };

  const handleOptionClick = (option) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    }
    setIsOpen(false);
  };

  return(
    <div className='dropdown'>
      <button className="dropdown-button" onClick={toggleDropdown}>
       {title}
      </button>
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