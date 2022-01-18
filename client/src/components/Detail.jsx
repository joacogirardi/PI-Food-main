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
                <div className='crd'>
                    <h1 className='name'>{recipe[0].name}</h1>
                    <img src={recipe[0].image} alt='img nf' />
                    <p>Diets :</p>
                    <h3 className='diets'>{recipe[0].diets}</h3>
                    <p>Dish types :</p>
                    <h3 className='dish'>{recipe[0].dishTypes}</h3>
                    <h2 className='sumsteps'>{recipe[0].summary.replace(/<[^>]*>?/g, "")}</h2>
                    <div className='scores'>
                            <p className='pscore'>Score</p>
                            <h2 className='scoren'>{recipe[0].spoonacularScore}</h2>
                            <p className='pscore'>Health score</p>
                            <h2 className='scoreh'>{recipe[0].healthScore}</h2>
                    </div>
                    <h2 className='sumsteps'>{recipe[0].steps[0].step ? recipe[0].steps.map(e=>(' ' + e.number + ' : ' + e.step)) : recipe[0].steps}</h2>
                    <Link to={'/home'}><button className='backhome'>Back Home</button></Link>
                </div>
                :
                <div>
                    <img className="loadimg" src="https://media.giphy.com/media/nS7Gwwg9xutspW9yFy/giphy.gif" alt="Loading"/>
                        <h1 className="loadh1">Loading...</h1>
                    <h3 className="loadh3">Please wait</h3>
                </div>
            }
        </div>
    ) 
}





