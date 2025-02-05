const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  .then(async () => {
    try {
      const recipes = await Recipe.insertMany(data);
      const updateRigatoni = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      );
      // console.log(updateRigatoni?.duration);
      const removeCarrot = await Recipe.deleteOne({ title: "Carrot Cake" });
      // const recipe = Recipe.create(data[0]);
      // Run your code here, after you have insured that the connection was made
      await mongoose.disconnect();
    } catch (error) {
      console.log(error);
    }
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
