import React from "react";
import "./FormComponents.css";
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
  manipulationFunction,
}) => {
  return (
    <button
      type={type}
      name={name}
      id={id}
      className={`button-component ${additionalClass}`}
      onClick={manipulationFunction}
    >
      {textButton}
    </button>
  );
};

export const Select = ({
  dados = [],
  id,
  name,
  required,
  additionalClass = "",
  manipulationFunction,
  defaultValue,
}) => {
  return (
    <select
      name={name}
      required={required}
      id={id}
      className={`input-component ${additionalClass} `}
      onChange={manipulationFunction}
      value={defaultValue}
    >
      <option value="select">Selecione</option>
      {dados.map((opt) => {
        return (
          <option key={opt.idTipoEvento} value={opt.idTipoEvento}>
            {opt.titulo}
          </option>
        );
      })}
    </select>
  );
};
