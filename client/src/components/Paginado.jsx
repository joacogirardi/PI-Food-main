import React from "react";
import styled from "styled-components";

export default function Paginado ({recipesPage, allRecipes, paginado}){
    const pageNumbers = [];

    for(let i = 0 ; i < Math.ceil(allRecipes/recipesPage); i++){
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <ul>
                {
                pageNumbers&&
                pageNumbers.map(num =>(
                    <li key = {num}>
                        <a href="#">
                    <button onClick={() => paginado(num)}> {num} </button>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>

    )
}

