import React from "react";
import './FormComponents.css'
export const Input = ({
  type,
  id,
  required,
  additionalClass,
  value,
  name,
  placeholder,
  manipulationFunction,
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      required={required}
      className={`input-component ${additionalClass}`}
      placeholder={placeholder}
      onChange={manipulationFunction}
      autoComplete="off"
    />
  );
};


  export const Button = ({
    textButton, 
    id,
    name,
    type,
    additionalClass,
    manipulationFunction

  }) => {
  return (
    <button type= {type}
    name={name}
    id={id}
    className={`button-component ${additionalClass}`}
onClick={manipulationFunction}
    
    >{textButton}</button>
  ); 
}