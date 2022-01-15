import axios from 'axios';


export const getRecipes = ()=> {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/recipes');

        return dispatch({
            type: "GET_RECIPES",
            payload : json.data
        })
    }
}

export const filterRecipesByDiet = (payload)=>{
    return {
        type : "FILTER_BY_DIET",
        payload : payload
    }
}

export const orderByName = (payload)=>{
    return {
        type : "ORDER_BY_NAME",
        payload : payload
    }
}

export const orderBySpoonacularScore = (payload)=>{
    return{
        type : "ORDER_BY_SCORE",
        payload : payload
    }
}

export const getNameRecipes = (name)=>{
    return async function(dispatch){
        try{
            let json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            return dispatch({
                type : "GET_RECIPE_QUERY",
                payload : json.data
            })
        }
        catch(e){
            console.log(e)
        }
    }
}

export const getTypes = ()=>{
    return async function(dispatch){
        try{
            let json = await axios.get('http://localhost:3001/types');
            return dispatch({
                type : "GET_TYPES",
                payload : json.data
            })
        }
        catch(e){
            console.log(e)
        }
    }
}

export const postRecipes = (payload)=>{
    return async function(){
        try{
            let json = await axios.post('http://localhost:3001/recipe', payload);
            return json;
        }
        catch(e){
            console.log(e)
        }
    }
}