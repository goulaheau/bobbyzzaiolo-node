# Bobbyzzaiolo NodeJS

RESTful API in NodeJS + Express + Mongoose for Pizzas and Ingredients.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[Node.js](https://nodejs.org/en/download/) 8.8 or higher is required.

[MongoDB](https://www.mongodb.com/download) is required.

### Installing

Clone this repo or just download it as a zip and uncompress it in a folder.

Then, inside the folder, install the dependencies.

```
npm i
```

That's all, you can now start the server.

```
npm start
```

## Running the tests

```
npm test
```

## Author

**Enzo Cornand** - goulaheau@gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

### Generate your own documentation

Install globally jsdoc.

```
npm i jsdoc --save
```

Now use this command.

```
jsdoc a-file-to-documentate.js -t ./node_modules/ink-docstrap/template -c jsdoc.json -d doc
```

You can change the theme by modifying in jsdoc.json the property ``` template ```.

### Routes

Pizzas' routes:
```
GET    /pizzas     - Find all the pizzas.
GET    /pizzas/:id - Find a pizza by his id.
POST   /pizzas     - Create a pizza.
PUT    /pizzas/:id - Update a pizza by his id.
PATCH  /pizzas/:id - Update a pizza by his id.
DELETE /pizzas/:id - Delete a pizza by his id.
```

Ingredients' routes:
```
GET    /ingredients     - Find all the ingredients.
GET    /ingredients/:id - Find an ingredient by his id.
POST   /ingredients     - Create an ingredient.
PUT    /ingredients/:id - Update an ingredient by his id.
PATCH  /ingredients/:id - Update an ingredient by his id.
DELETE /ingredients/:id - Delete an ingredient by his id.
```

### Folder structure

```
project ----------------------- Root folder
│   app.js -------------------- Main file
│   app.spec.js --------------- Main tests
|   package.json -------------- Project dependencies 
│
├────asserts ------------------ Asserts files
│   │   ...
│
├────config ------------------- Config files defining the URIs of the DB
│   │   ...
│
├────controllers -------------- Controllers files
│   │   ingredients.js -------- Ingredients' controller
│   │   ingredients.spec.js --- Ingredients' controller tests
│   │   pizzas.js ------------- Pizzas' controller
│   │   pizzas.spec.js -------- Pizzas' controller tests
│
├────doc ---------------------- Documentation 
│   │   ...
│ 
├────helpers ------------------ Helpers files
│   │   router.js ------------- Router validation helper
│   │   view.js --------------- View helper to know port used
│
├───models -------------------- Models files
│   │   ingredient.js --------- Ingredient's model
│   │   pizza.js -------------- Pizza's model
│
├───routes -------------------- Routes files
│   │   ingredients.js -------- Ingredients' routes
│   │   pizzas.js ------------- Pizzas' routes
│
└───views --------------------- Views files
    │   socket.html ----------- Socket's view file (test purpose)
```

