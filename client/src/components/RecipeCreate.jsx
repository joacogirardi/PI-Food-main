import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTypes, postRecipes, getDishTypes } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/CreateStyle.css'


export default function RecipeCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const type = useSelector((state)=> state.recipeTypes);
    const dishTypes = useSelector((state)=> state.dishTypes);
    const [errors, setErrors] = useState({});
    
    

    function validate(input) {
        const errors = {};
        if (!input.name) {
            errors.name = '⚠️ Name is required ⚠️';
        }
        if (!input.diets.length) {
            errors.diets = '⚠️ Diets are required ⚠️'
        }
        if (!input.dishTypes.length) {
            errors.dishTypes = '⚠️ dishTypes are required ⚠️'
        }
        if (!input.image) {
            errors.image = '⚠️ image is required ⚠️'
        }
        if (!input.summary) {
            errors.summary = '⚠️ summary is required ⚠️'
        }
        if (!input.spoonacularScore) {
            errors.spoonacularScore = '⚠️ spoonacular Score is required ⚠️'
        }
        if (!input.healthScore) {
            errors.healthScore = '⚠️ health Score is required ⚠️'
        }
        if (!input.steps) {
            errors.steps = '⚠️ steps is required ⚠️'
        }
    
        return errors;
    };

    const [input, setInput] = useState({
        name : "",
        image : "",
        diets : [],
        dishTypes : [],
        summary : "",
        spoonacularScore : "",
        healthScore : "",
        steps : "",
    })

    useEffect(()=>{
        dispatch(getTypes());
    },[dispatch])

    useEffect(()=>{
        dispatch(getDishTypes());
    },[dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        setInput({
            ...input,
            dishTypes: [...input.dishTypes, e.target.value]
        })
    }

    function handleCheckbox(e){
        if(e.target.checked){
            setInput({
                ...input,
                diets : [...input.diets, e.target.value]
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipes(input));
        alert("Recipe successfully created");
        setInput({
            name : "",
            image : "",
            diets : [],
            dishTypes : [],
            summary : "",
            spoonacularScore : "",
            healthScore : "",
            steps : "",
        });
        navigate(-1);
    }

    function handleRemove(e){
        setInput({
            ...input,
            dishTypes : input.dishTypes.filter(t => t !== e)
        })
    }

    return (
        <div className='bgcr'>
        <div className='div'>
            <h1><strong>Create Recipe</strong></h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label className='labelA'>Recipe Name :</label>
                    <input
                    className='inpt' 
                    placeholder='Insert name'
                    type='text'
                    value={input.name}
                    name='name'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error' >{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className='labelDish'>Dish Types :</label>
                    <select className='slt' onChange={(e)=>handleSelect(e)} value={input.dishTypes}>
                        <option value="" disabled selected> Select dish types </option>
                        
                            {dishTypes.map((t)=>(
                                <option value={t}>{t}</option>
                            ))}

                    </select>
                <div className='envts'>

                    {input.dishTypes.map(e=>
                    <div className='slct'>
                        <ul className='li'>
                            <button className='btnrm' type='button' onClick={()=> handleRemove(e)}> x </button>
                            <li>
                            {e}
                            </li>
                        </ul>
                    </div>
                        )}
                   
                </div>
                    {errors.dishTypes && (
                        <p className='error'>{errors.dishTypes}</p>
                    )}
                </div>
                <div>
                    <p className='pdiet'>Diets</p>
                    {/* {errors.diets && (
                        <p>{errors.diets}</p>
                    )} */}
                    {type.map((t)=>(
                        <label className='cbx'>
                        <input className='icbx' type='checkbox' value={t} name='diets' onChange={(e)=> handleCheckbox(e)}/> {t}
                        </label>
                            ))}
                </div>
                <div>
                    <label className='labelB'>Steps :</label>
                    <input
                    className='inpt' 
                    placeholder='Insert steps'
                    type='text'
                    value={input.steps}
                    name='steps'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.steps && (
                        <p className='error' >{errors.steps}</p>
                    )}
                </div>
                <div>
                    <label className='labelC'>Summary :</label>
                    <input 
                    className='inpt'
                    placeholder='Write an summary'
                    type='text'
                    value={input.summary}
                    name='summary'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.summary && (
                        <p className='error'>{errors.summary}</p>
                    )}
                </div>
                <div>
                    <label className='labelD'>Spoonacular Score :</label>
                    <input 
                    className='inpt'
                    placeholder='Insert Score'
                    type='number'
                    value={input.spoonacularScore}
                    name='spoonacularScore'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.spoonacularScore && (
                        <p className='error'>{errors.spoonacularScore}</p>
                    )}
                </div>
                <div>
                    <label className='labelE'>Health Score :</label>
                    <input 
                    className='inpt'
                    placeholder='Insert healthScore'
                    type='number'
                    value={input.healthScore}
                    name='healthScore'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.healthScore && (
                        <p className='error'>{errors.healthScore}</p>
                    )}
                </div>
                <div>
                    <label className='labelF'>Image :</label>
                    <input 
                    className='inpt'
                    placeholder='Paste image url'
                    type='text'
                    value={input.image}
                    name='image'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.image && (
                        <p className='error'>{errors.image}</p>
                    )}
                </div>
                <button type='submit'>Create recipe!</button>
            </form>
            <Link to={"/home"}><button>Back</button> </Link>
        </div>
        </div>
    )
}