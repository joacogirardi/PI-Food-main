import React from "react";
import { Link } from "react-router-dom";

export default function Card (image, name, recipeType, id){
    return(
        <div>
            <img src={image} alt='nf'/>
            <h2>{name}</h2>
            <h3>{recipeType}</h3>
            <Link to={'./recipe' + id}>
                <h3>see details</h3>
            </Link>
        </div>
    )
}