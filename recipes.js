import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

// GET ALL RECIPES
export async function getRecipes() {
  const recipesJSON = await fs.readFile(fileName, "utf8");
  let recipes = await JSON.parse(recipesJSON);
  return recipes;
}

// GET A RECIPE BY ID
export async function getRecipeByID(id) {
  const recipesJSON = await fs.readFile(fileName, "utf8");
  let recipes = await JSON.parse(recipesJSON);

  let recipeIndex = null;

  recipeIndex = recipes.findIndex((item) => item.id === id);
  if (recipeIndex !== -1) {
    return recipes[recipeIndex];
  } else {
    return null;
  }
}

// CREATE A RECIPE
export async function createRecipe(newRecipe) {
  const recipesJSON = await fs.readFile(fileName, "utf8");
  let recipes = await JSON.parse(recipesJSON);
  newRecipe.id = uuidv4();
  recipes.push(newRecipe);

  let stringifiedRecipes = JSON.stringify(recipes, null, 2);
  await fs.writeFile(fileName, stringifiedRecipes, "utf-8");
  return stringifiedRecipes;
}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {
  const recipesJSON = await fs.readFile(fileName, "utf8");
  let recipes = await JSON.parse(recipesJSON);

  let recipeIndex = recipes.findIndex((item) => item.id === id);
  if (recipeIndex !== -1) {
    updatedRecipe.id = id;
    recipes[recipeIndex] = updatedRecipe;
  } else {
    return null;
  }
  let stringifiedRecipes = JSON.stringify(recipes, null, 2);
  await fs.writeFile(fileName, stringifiedRecipes, "utf-8");
  return updatedRecipe;
}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {
  const recipesJSON = await fs.readFile(fileName, "utf8");
  let recipes = await JSON.parse(recipesJSON);
    let doomedRecipe = {}
  let recipeIndex = recipes.findIndex((item) => item.id === id);
  if (recipeIndex !== -1) {
    doomedRecipe = recipes[recipeIndex]
    recipes.splice(recipeIndex, 1);
    
  } else {
    return null;
  }
  let stringifiedRecipes = JSON.stringify(recipes, null, 2);
  await fs.writeFile(fileName, stringifiedRecipes, "utf-8");

  return doomedRecipe;
}
