import express from 'express'
import {dirname, join } from 'path'
import { config } from 'dotenv'
import { fileURLToPath } from 'url';
import { MongoClient, ServerApiVersion } from "mongodb"
import bodyParser from 'body-parser'

config();

const app = express()
const port = process.env.PORT || ''
const db_uri = process.env.ATLAS_URI || ''

const client = new MongoClient(db_uri,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }
)

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



// workaround for modules in js

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));

app.get('/', (_, res) => {
  res.render("index")
})
app.get('/about', (_, res) => {
  res.render("about")
})
app.get('/volunteer', (_, res) => {
  res.render("volunteer")
})
app.get('/contact', (_, res) => {
  res.render("contact")
})


function validate_giver(data) {
  const errors = [];

  if (!data.orgName || data.orgName.trim().length < 2)
    errors.push("Organization name is required and must be at least 2 characters.");
  if (!data.contactPerson || data.contactPerson.trim().length < 2)
    errors.push("Contact person name is required.");
  if (!data.donorEmail || !/^[^@]+@[^@]+\.[^@]+$/.test(data.donorEmail))
    errors.push("A valid email address is required.");
  if (!data.donorPhone || !/^\+?\d{7,15}$/.test(data.donorPhone))
    errors.push("A valid phone number is required (7–15 digits).");
  if (!data.foodType || data.foodType.trim().length < 3)
    errors.push("Type of food surplus is required.");
  if (!data.pickupTime || data.pickupTime.trim().length < 3)
    errors.push("Preferred pickup time is required.");

  return errors;
}

app.post('/join/giver', (req, res) => {
  const data = req.body
  const errors = validate_giver(data);
  const notification = {
    status: "",
    message: "",
  }

  if (errors.length > 0) {
    // invalid things
    notification.message = errors.join('\n')
    notification.status = "error"
    return res.status(422).render('volunteer', { notification })
  }

  const db = load_db()

  if (db.giver.some(entry => entry.donorEmail === data.donorEmail)) {
    // duplicates
    notification.message = "A donor already registered with this email"
    notification.status = "error"
    return res.status(409).render('volunteer', {
      notification
    })
  }
  const newGiver = {
    orgName: data.orgName.trim(),
    contactPerson: data.contactPerson.trim(),
    donorEmail: data.donorEmail.trim(),
    donorPhone: data.donorPhone.trim(),
    foodType: data.foodType.trim(),
    pickupTime: data.pickupTime.trim(),
    createdAt: new Date().toISOString()
  }
  notification.status = "success"
  notification.message = `Thanks ${newGiver.donorEmail} for registering, we'll get in touch!`
  db.giver.push(newGiver)
  save_to_db(db)
  return res.status(201).render(
    'index',
    {
      notification
    }
  )

})


app.post('/join/driver', (req, res) => {

})

app.listen(port, () => {
  console.log(`Kilometros de Vida running at port ${port}`)
})
