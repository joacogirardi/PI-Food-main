import React from "react";
import styled from "styled-components";
import '../styles/PaginadoStyle.css'

const Div = styled.div`
padding: 22px;
height: 20px;
`
const Button = styled.button`
color: #30251b;
border-color: #e5b56d;
margin: 4px;
border-style: inset;
border-radius: 5px;
width: 50px;
background-color : #e5b56d;
cursor: pointer;
`

export default function Paginado ({recipesPage, allRecipes, paginado}){
    const pageNumbers = [];

    for(let i = 0 ; i < Math.ceil(allRecipes/recipesPage); i++){
        pageNumbers.push(i+1)
    }

    return (
        <div className="cont">
                {
                pageNumbers&&
                pageNumbers.map(num =>(
                    <a href="#">
                    <button className="nums" onClick={() => paginado(num)}> {num} </button>
                    </a>
                ))}
        </div>

    )
}

