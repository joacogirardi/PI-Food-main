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