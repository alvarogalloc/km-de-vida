const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = 3000
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render("index");
})
app.get('/about', (req, res) => {
  res.render("about");
})
app.get('/volunteer', (req, res) => {
  res.render("volunteer");
})

app.post('/join/driver', (req, res) => {

})

app.post('/join/giver', (req, res) => {

})


app.listen(port, () => {
  console.log(`Pokedex running at port ${port}`)
})
