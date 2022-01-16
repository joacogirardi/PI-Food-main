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

    const [input, setInput] = useState({
        name : "",
        image : "",
        diets : [],
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
        navigate(-1)
    }

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
                    {type.map((t)=>(
                        <label>
                        <input type='checkbox' value={t} name={t} onChange={(e)=> handleCheckbox(e)}/> {t}
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
                </div>
                <button type='submit'>Create recipe!</button>
            </form>
        </div>
    )
}