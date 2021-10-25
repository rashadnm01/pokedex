const express = require("express");
const path = require("path");
const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});
const methodOverride = require("method-override");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});
app.use(methodOverride("_method"));
const pokedex = require("./models/pokemon");
let index = 10;

for (let i = 0; i < 10; i++) {}
const port = 3000;
app.listen(port, console.log("Server running... port: " + port));

app.get("/pokemon/new", (req, res) => {
  console.log("We're getting to news");
  res.render("new");
});

app.post("/pokemon", (req, res) => {
  index += 1;
  const pokemonID = req.body.id;
  const pokemonName = req.body.name;
  console.log([pokedex[pokemonID]]);
  if (pokemonName == "") {
    pokedex[index] = pokedex.find((poke) => poke.id == pokemonID);
  } else {
    pokedex[index] = pokedex.find((poke) => poke.name == pokemonName);
  }
  res.redirect("/pokemon");
});
app.get("/pokemon/:id", (req, res) => {
  const pokeID = req.params.id;
  res.render("show", { pokemon: pokedex[pokeID], id: pokeID });
});
app.get("/pokemon/:id/edit", (req, res) => {
  const id = req.params.id;
  res.render("edit", { pokemon: pokedex[id], id: id });
});
app.put("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const pokemonID = req.body.id;
  const pokemonName = req.body.name;
  console.log([pokedex[pokemonID]]);
  if (pokemonName == "") {
    pokedex[id] = pokedex.find((poke) => poke.id == pokemonID);
  } else {
    pokedex[id] = pokedex.find((poke) => poke.name == pokemonName);
  }
  res.redirect("/pokemon");
});
app.get("/pokemon", (req, res) => {
  res.render("index", { pokemon: pokedex, i: index });
});
app.delete("/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const currentPokemon = pokedex[id];
  index -= 1;
  pokedex.splice(id, 1);
  pokedex.push(currentPokemon);
  res.redirect("/pokemon");
});
