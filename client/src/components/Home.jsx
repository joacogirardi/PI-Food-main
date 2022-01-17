import React, { Fragment, useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import Card from './Card';
import {getRecipes, filterRecipesByDiet, orderByName, orderBySpoonacularScore} from '../actions/index';
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import '../styles/NavStyle.css'




export default function Home () {
const dispatch = useDispatch();
const allRecipes = useSelector((state)=> state.allRecipes);  //tiene el array de recipes dentro del estado
const [order, setOrder] = useState('');

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

function handleSortName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`ordered by name${e.target.value}`);
}

function handleSortScore(e){
    e.preventDefault();
    dispatch(orderBySpoonacularScore(e.target.value));
    setCurrentPage(1);
    setOrder(`ordered by score${e.target.value}`)
}


    return (
        <div className="bg">
            <NavBar />
            <div className="navhome">
                <SearchBar />
                <div className="filters">
                    <select onChange={e=> {handleSortName(e)}}>
                        <option value="" disabled selected>Sort Alphabetically</option>   
                        <option value='asc'> asce </option>
                        <option value='dsc'> desc </option>
                    </select>
                    <select onChange={e=> {handleSortScore(e)}}>
                        <option value="" disabled selected>Sort by Score</option>   
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
                    <button className="rmflts" onClick={e=> {handleClick(e)}}>
                    clear filters
                    </button>
                </div>
                    <Link to='/recipe'>
                        <button className="createrecipe">Create recipe</button>
                    </Link>
            </div>
              { 
                currentRecipes.length > 0 ?(
                currentRecipes?.map((e)=>{
                    return (
                        <Fragment>
                            <Card image={e.image} name={e.name} diets={e.diets} dishTypes={e.dishTypes} id={e.id}/>
                        </Fragment>
                    )
                })) :
                <div>
                <img className="loadimg" src="https://media.giphy.com/media/nS7Gwwg9xutspW9yFy/giphy.gif" alt="Loading"/>
                <h1 className="loadh1">Loading...</h1>
                <h3 className="loadh3">Please wait while we find best recipes for you</h3>
                    </div>
            }
            <Paginado 
                recipesPage={recipesPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
            />
             <p className="creditos">website created and designed by Joaquin Girardi-FT20a in representation of <a href="https://www.soyhenry.com/">Henry</a> individual project</p>
        </div>
    )
}

