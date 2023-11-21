import React, { useState } from 'react';

const Input = (props) => { //construtor
    const [meuValor, setMeuValor] = useState ("Eduardo"); 

function alternarValor(v) {
    setMeuValor(v)
}


    return (
        <div>
            <input
            
            type= {props.tipo} 
            id={props.id}
            name= {props.nome}
            placeholder={props.dicaCampo }
            value={props.valor}
            onChange={(e) =>  { 

                setMeuValor(e.target.value ) // valor atual de componente
            }}
            />
            <span>{props.valor}</span>
        </div>
    );
};

export default Input;