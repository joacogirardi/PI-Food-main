import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTypes, postRecipes } from '../actions';
import { useDispatch, useSelector } from 'react-redux';


export default function RecipeCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const type = useSelector((state)=> state.recipeTypes);
    const [errors, setErrors] = useState({});

    function validate(input) {
        const errors = {};
        if (!input.name) {
            errors.name = '⚠️ Name is required ⚠️';
        }
        if (!input.diets.length) {
            errors.diets = '⚠️ Diets is required ⚠️'
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
        // dishTypes : []
        summary : "",
        spoonacularScore : "",
        healthScore : "",
        steps : "",
    })

    useEffect(()=>{
        dispatch(getTypes())
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

    function handleCheckbox(e){
        if(e.target.checked){
            setInput({
                ...input,
                diets : [...input.diets, e.target.value].join(',')
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipes(input));
        console.log(input);
        alert("Recipe successfully created");
        setInput({
            name : "",
            image : "",
            diets : [],
            summary : "",
            spoonacularScore : "",
            healthScore : "",
            steps : "",
        });
        navigate(-1);
    }

    // function handleRemove(e){
    //     setInput({
    //         ...input,
    //         types : input.types.filter(t => t !== e)
    //     })
    // }

    return (
        <div>
            <Link to={"/home"}><button>Back</button> </Link>
            <h1><strong>Create Recipe</strong></h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name :</label>
                    <input 
                    placeholder='Name'
                    type='text'
                    value={input.name}
                    name='name'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                {/* <div>
                    <label>Diets</label>
                    <select value={input.diets}>
                        <option value="" disabled selected> Diet types </option>

                            {type.map((t)=>(
                                <option value={t}>{t}</option>
                            ))}

                    </select>
                </div> */}
                <div>
                    <p>Diets</p>
                    {/* {errors.diets && (
                        <p>{errors.diets}</p>
                    )} */}
                    {type.map((t)=>(
                        <label>
                        <input type='checkbox' value={t} name='diets' onChange={(e)=> handleCheckbox(e)}/> {t}
                        </label>
                            ))}
                </div>
                <div>
                    <label>Steps :</label>
                    <input 
                    placeholder='Steps'
                    type='text'
                    value={input.steps}
                    name='steps'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.steps && (
                        <p>{errors.steps}</p>
                    )}
                </div>
                <div>
                    <label>Summary</label>
                    <input 
                    placeholder='Summary'
                    type='text'
                    value={input.summary}
                    name='summary'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.summary && (
                        <p>{errors.summary}</p>
                    )}
                </div>
                <div>
                    <label>Spoonacular Score</label>
                    <input 
                    placeholder='spoonacular Score'
                    type='number'
                    value={input.spoonacularScore}
                    name='spoonacularScore'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.spoonacularScore && (
                        <p>{errors.spoonacularScore}</p>
                    )}
                </div>
                <div>
                    <label>Health Score</label>
                    <input 
                    placeholder='healthScore'
                    type='number'
                    value={input.healthScore}
                    name='healthScore'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.healthScore && (
                        <p>{errors.healthScore}</p>
                    )}
                </div>
                <div>
                    <label>Image</label>
                    <input 
                    placeholder='Image url'
                    type='text'
                    value={input.image}
                    name='image'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.image && (
                        <p>{errors.image}</p>
                    )}
                </div>
                <button type='submit'>Create recipe!</button>
            </form>
        </div>
    )
}