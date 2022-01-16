const { Router } = require('express');
const axios = require('axios');
const {Type, Recipe} = require('../db')

const API_KEY = 'f5438767b84545c3a7e2daa0d6a1a9f9';
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

 
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//limit de 100
const recipes_api = async()=>{
    try {
        const url = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
        const results = url.data.results;
        const recipe_json = [];
        for (let i = 0 ; i < results.length ; i++){
            let data = await results[i];
            recipe_json.push({
                id : data.id,
                name : data.title,
                image : data.image,
                dishTypes : data.dishTypes,
                diets : data.diets.join(', '),
                summary : data.summary,
                spoonacularScore : data.spoonacularScore,
                healthScore : data.healthScore,
                steps : data.analyzedInstructions[0]? data.analyzedInstructions[0].steps : "Steps Not Available",
            })
        }
        return recipe_json;
    }
    catch(e){
        console.log(e)
    }
};
 
//allRecipes sin limit
const allRecipes_api = async()=>{
    try {
        const url = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
        const results = url.data.results;
        const recipe_json = [];
        for (let i = 0 ; i < results.length ; i++){
            let data = await results[i];
            recipe_json.push({
                id : data.id,
                name : data.title,
                image : data.image,
                dishTypes : data.dishTypes,
                diets : data.diets,
                summary : data.summary,
                spoonacularScore : data.spoonacularScore,
                healthScore : data.healthScore,
                steps : data.analyzedInstructions[0]? data.analyzedInstructions[0].steps : "Steps Not Available",
            })
        }
        return recipe_json;
    }
    catch(e){
        console.log(e)
    }
};


const recipes_db = async()=>{
    return await Recipe.findAll({
        include : {
            model: Type,
            attributes : ['name'],
            through : {
                attributes: [],
            }
        }
    })
};

const getAllRecipes = async ()=>{
    const apiInfo = await recipes_api();
    const dbInfo =await recipes_db();
    const info = apiInfo.concat(dbInfo);
    return info
}



router.get('/recipes', async (req, res)=>{
    try{
        const name = req.query.name;
        const data = await getAllRecipes();
        if (name){
            const rcp = await data.filter(key => key.name.toLowerCase().includes(name.toLowerCase()));
            rcp.length ?
            res.status(200).send(rcp) :
            res.status(404).send('Recipe not found')
        }
        else {
            res.status(200).send(data);
        }
    }
    catch(e){
        console.log(e)
    }
});

router.get('/recipes/:id', async (req, res)=>{
    const id = req.params.id;
    const recipeinf = [];
    try {
        if(id.length < 10){
            const inf = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            const data = await inf.data;
            recipeinf.push({
                id : data.id,
                name : data.title,
                image : data.image,
                dishTypes : data.dishTypes,
                diets : data.diets,
                summary : data.summary,
                spoonacularScore : data.spoonacularScore,
                healthScore : data.healthScore,
                steps : data.analyzedInstructions[0]? data.analyzedInstructions[0].steps : "Steps Not Available",
            })
            res.send(recipeinf)
        }
        else {
                //buscar en DB
                const recipeDB = await Recipe.findOne({
                    where : {id : id}
                });
                const recipeDBARR = [];
                recipeDBARR.push(recipeDB)
                res.send(recipeDBARR);
        }
    }
    catch(e){
        console.log(e)
    }
});

router.get('/types', async (req, res)=>{
    try {
        const types = ["vegetarian", "vegan", "gluten free"];
        const dat = await allRecipes_api();
        const types_arrays = dat.map(e=> e.diets);

        types_arrays.forEach(e=> e.map(e=> {
            if(!types.includes(e)){
                types.push(e)
            }
        }) );

        types.forEach(e => {
            Type.findOrCreate({
                where: {name : e}
            })
        });

        const allresults = await Type.findAll({
            attributes : ["name"]
        });
        res.send(allresults.map(e=>e.name)) 
    }
    catch(error){
        console.log(error)
    }
});

router.post('/recipe', async (req, res)=>{
    try {
        const {
            name,
            image,
            dishTypes,
            diets,
            summary,
            spoonacularScore,
            healthScore,
            steps
        } = req.body;
        
        const newRecipe = await Recipe.create({
            name : name,
            image : image,
            dishTypes : dishTypes,
            diets : diets,
            summary : summary,
            spoonacularScore : spoonacularScore,
            healthScore : healthScore,
            steps : steps
        })
    
        let recipetypedb = await Type.findAll({
            where : {name : diets}
        });
        newRecipe.addTypes(recipetypedb);
        res.status(200).send('Recipe successfully created');
    }
    catch(e){
        console.log(e)
    }

    
});

module.exports = router;
