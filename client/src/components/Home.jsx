import React, { Fragment, useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import Card from './Card';
import {getRecipes} from '../actions/index';


export default function Home () {
const dispatch = useDispatch();
const allrecipes = useSelector((state)=> state.recipes);  //tiene el array de recipes dentro del estado

useEffect(()=>{
    dispatch(getRecipes())
},[dispatch]);


function handleClick(e){
    e.preventDefault();
    dispatch(getRecipes());
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
                <select>
                    <option value="" disabled selected>Filter by Diet</option>   
                    <option value='main course'> Main course </option>
                    <option value='side dish'> Side Dish </option>
                    <option value='dessert'> Dessert </option>
                    <option value='appetizer'> Appetizer </option>
                    <option value='bread'> Bread </option>
                    <option value='breakfast'> Breakfast </option>
                    <option value='salad'> Salad </option>
                    <option value='soup'> Soup </option>
                    <option value='beverage'> Beverage </option>
                    <option value='sauce'> Sauce </option>
                    <option value='marinade'> Marinade </option>
                </select>
            </div>
            {/* {
                <Fragment>
                    <Card image={} name={} recipeType={} id={}/>
                </Fragment>
            } */}
        </div>
    )
}

