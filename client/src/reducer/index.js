
const initialState = {
    recipes : [],
    allRecipes : [],
    recipeTypes : [],
    detail : []
};




const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_RECIPES' : 
            return {
                ...state,
                recipes : action.payload,
                allRecipes : action.payload
            };
        case "FILTER_BY_DIET" :
            const All_recipes = state.allRecipes;
            const dietFiltered = action.payload === 'all' ? All_recipes : All_recipes.filter(e=> e.diets.includes(action.payload));
            return {
                ...state,
                allRecipes : dietFiltered
            }
        case "ORDER_BY_NAME" : 
            const arrSorted = action.payload === 'asc' ?
                state.allRecipes.sort(function (a, b){
                    if (a.name > b.name){
                        return 1
                    }
                    if (b.name > a.name){
                        return -1
                    }
                    return 0
                }):
                    state.allRecipes.sort(function (a, b){
                    if (a.name > b.name){
                        return -1
                    }
                    if (b.name > a.name){
                        return 1;
                    }
                    return 0
                    })
            return {
                ...state,
                allRecipes : arrSorted
            }
            case "ORDER_BY_SCORE" : 
            const arrScored = action.payload === 'asc' ?
                state.allRecipes.sort(function (a, b){
                    if (a.healthScore > b.healthScore){
                        return 1
                    }
                    if (b.healthScore > a.healthScore){
                        return -1
                    }
                    return 0
                }):
                    state.allRecipes.sort(function (a, b){
                    if (a.healthScore > b.healthScore){
                        return -1
                    }
                    if (b.healthScore > a.healthScore){
                        return 1;
                    }
                    return 0
                    })
            return {
                ...state,
                allRecipes : arrScored
            }        
        case "GET_RECIPE_QUERY" :
            return {
                ...state,
                allRecipes : action.payload
            }
        case "GET_TYPES"  : 
            return {
                ...state,
                recipeTypes : action.payload
            }
        case "POST_RECIPE" : 
            return {
                ...state
            }
        case "GET_DETAIL" :
            return{
                ...state,
                detail : action.payload
            }
        default : 
            return state
    }
}

export default rootReducer;