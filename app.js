import express from "express";
import morgan from "morgan";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = 3000;
let count = 0;
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("tiny"))
app.use ((req,res, next)=>{
  count ++
  console.log(`Number of requests: ${count}`)
  next();

})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/api/recipes", async (req,res)=>{
  let allRecipes = await getRecipes();
  let success = true
  if (allRecipes === null) {success = false}
  res.send({"payload": allRecipes, "success": success})
})

app.get("/api/recipes/:id", async (req, res) =>{
  let chosenRecipe = await getRecipeByID(req.params.id)
  let success = true
  if (chosenRecipe === null) {success = false}
  res.send({"payload": chosenRecipe, "success": success})
})
app.post("/api/recipes", async (req, res)=> {
  let postedRecipe = await createRecipe(req.body)
  res.send({"payload":postedRecipe, "success": true})
})

app.patch("/api/recipes/:id", async (req, res)=>{
  let patchedRecipe = await updateRecipeByID(req.params.id, req.body)
  let success = true
  if (patchedRecipe === null) {success = false}
  res.send({"payload": patchedRecipe, "success": success })
})

app.delete("/api/recipes/:id", async (req, res)=>{
  let deletedRecipe = await deleteRecipeByID(req.params.id)
  let success = true
  if (deletedRecipe === null) {success = false}
  res.send({"payload": deletedRecipe, "success": success})
})