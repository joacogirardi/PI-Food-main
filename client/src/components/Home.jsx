import React, { Fragment, useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
// import { Link } from "react-router-dom";
import Card from './Card';
import {getRecipes, filterRecipesByDiet} from '../actions/index';
import Paginado from "./Paginado";


export default function Home () {
const dispatch = useDispatch();
const allRecipes = useSelector((state)=> state.recipes);  //tiene el array de recipes dentro del estado

const [currentPage, setCurrentPage] = useState(1);
const [recipesPage, setRecipesPage] = useState(9);
const indexLastRecipe = currentPage * recipesPage;
const indexFirstRecipe = indexLastRecipe - recipesPage;
const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);


const paginado = (pageNumber)=>{
    setCurrentPage(pageNumber)
}

useEffect(()=>{
    dispatch(getRecipes())
},[dispatch]);


function handleClick(e){
    e.preventDefault();
    dispatch(getRecipes());
}

function handleFilterDiets(e){
    dispatch(filterRecipesByDiet(e.target.value))
}





    return (
        <div>
            <button onClick={e=> {handleClick(e)}}>
                reload recipes
            </button>
            <div>
                <select>
                    <option value="" disabled selected>Order alfabeticam</option>   
                    <option value='asc'> asce </option>
                    <option value='dsc'> desc </option>
                </select>
                <select>
                    <option value="" disabled selected>Order puntuacion</option>   
                    <option value='asc'> asce </option>
                    <option value='dsc'> desc </option>
                </select>
                <select onChange={e => handleFilterDiets(e)}>
                    <option value="" disabled selected>Filter by Diet</option>  
                    <option value='all'> All </option> 
                    <option value='vegetarian'> Vegetarian </option>
                    <option value='vegan'> Vegan </option>
                    <option value='gluten free'> Gluten free </option>
                    <option value='dairy free'> Dairy free </option>
                    <option value='lacto ovo vegetarian'> lacto ovo vegetarian </option>
                    <option value='paleolithic'> paleolithic </option>
                    <option value='primal'> Primal </option>
                </select>
            </div>
            {   
                currentRecipes?.map((e)=>{
                    return (
                        <Fragment>
                            <Card image={e.image} name={e.name} diets={e.diets} id={e.id}/>
                        </Fragment>
                    )
                })

            }
            <Paginado 
                recipesPage={recipesPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
            />
        </div>
    )
}

