const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type : DataTypes.UUID,
      defaultValue : UUIDV4,
      primaryKey : true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true,
    },
    image: {
      type : DataTypes.STRING,
    },
    diets: {
      type : DataTypes.STRING,
    },
    dishTypes: {
      type : DataTypes.STRING,
    },
    summary: {
      type : DataTypes.STRING,
    },
    spoonacularScore: {
      type : DataTypes.INTEGER,
    },
    healthScore : {
      type : DataTypes.INTEGER,
    },
    steps : {
      type : DataTypes.STRING,
    }
  });
};
