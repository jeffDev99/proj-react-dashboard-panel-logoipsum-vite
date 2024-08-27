import React from 'react';
import "./RadioButtonGroup.css"
const RadioButtonGroup = ({ options, name, selectedValue, onChange }) => {
  
  return (
    <div>
      {options.map((option) => (
        <label  className={`radio-group-label ${selectedValue === option.value?"active":""}`} key={option.value}>
          <input
            type="radio"
            name={name}
            className='radio-group-input'
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};


export default RadioButtonGroup;
