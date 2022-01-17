import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getDetails } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/DetailStyle.css'

export default function Detail(props){
    const dispatch = useDispatch();
    const {id} = useParams();
    
    useEffect(()=>{
        dispatch(getDetails(id))
    }, [dispatch])
    
    const recipe = useSelector((state)=> state.detail);
    console.log(recipe)
    return(
        <div className='bg'>
            {
                recipe.length > 0 ?
                <div>
                    <h1>{recipe[0].name}</h1>
                    <img src={recipe[0].image} alt='img nf' />
                    <h3>{recipe[0].diets}</h3>
                    <h3>{recipe[0].dishTypes}</h3>
                    <h2>{recipe[0].summary}</h2>
                    <h2>{recipe[0].spoonacularScore}</h2>
                    <h2>{recipe[0].healthScore}</h2>
                    <h2>{recipe[0].steps[0].step ? recipe[0].steps.map(e=>(' ' + e.number + ' : ' + e.step)) : recipe[0].steps}</h2>
                    <Link to={'/home'}><button>Back Home</button></Link>
                </div>
                :
                <div>
                    <h1>Loading...</h1>
                </div>
            }
        </div>
    ) 
}





