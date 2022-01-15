
const initialState = {
    recipes : [],
};




const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_RECIPES' : 
            return {
                ...state,
                recipes : action.payload
            };
        case "FILTER_BY_DIET" :
            const Allrecipes = state.recipes;
            const dietFiltered = action.payload === 'all' ? Allrecipes : Allrecipes.filter(e=> e.diets.includes(action.payload));
            return {
                ...state,
                recipes : dietFiltered
            }
        default : 
            return state
    }
}

export default rootReducer;