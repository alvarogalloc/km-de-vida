Prototype Kilometros de Vida
Regina Beltrán López
Álvaro Gallo Cruz
Daniela Terán Martija

# deployment
our service is currently deployed  [here](https://km-de-vida.onrender.com/)

# Ai report

- used chatGPT and copilot for the following tasks:
  + mock data because we lack a db
  + generate auxiliary classes for our colour palette
  + apply consistency of style to other components
  + creating layouts using bootstrap for contact page + volunteer forms

## second ai report
- used for discovering bootstrap elements like the toast
  + prompt: How to create a notification in bootstrap?ta
  + response: dummy code and link to documentation
- ejs migration:
  + prompt "how would you split this .html file in  sections with .ejs to avoid code duplication?"
  + response: plan for migrating to views and partial components with ejs


# how to run
- run `npm i ` to install dependencies
- run `npm run start ` to start server
- run `npm run dev ` to start server with hot-reload


# To-do
We have to remove the previously used .html files, but our deployment works and we don't want to touch it right now
