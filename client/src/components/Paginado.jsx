import React from "react";
import '../styles/PaginadoStyle.css'

export default function Paginado ({recipesPage, allRecipes, paginado}){
    const pageNumbers = [];

    for(let i = 0 ; i < Math.ceil(allRecipes/recipesPage); i++){
        pageNumbers.push(i+1)
    }

    return (
        <div className="cont">
            <ul>
                {
                pageNumbers&&
                pageNumbers.map(num =>(
                    <li key = {num}>
                        
                    <button className="btn" onClick={() => paginado(num)}> {num} </button>
                        
                    </li>
                ))}
            </ul>
        </div>

    )
}

