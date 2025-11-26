import express from 'express'
import { dirname, join } from 'path'
import { config } from 'dotenv'
import { fileURLToPath } from 'url';
import { MongoClient, ServerApiVersion } from "mongodb"
import bodyParser from 'body-parser'

config();

const app = express()
const port = process.env.PORT || 5050
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

let db;
let drivers;
let givers;
async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    drivers = db.collection("drivers");
    givers = db.collection("givers");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

// mongo keeps running if we don't stop it here
// so when we press ctrl+c it actually quits
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Add JSON body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

// here are the api endpoints
app.get('/api/data', async (req, res) => {
  try {
    const all_drivers = await drivers.find({}).toArray();
    const all_givers = await givers.find({}).toArray();
    res.json({ drivers: all_drivers, givers: all_givers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get('/', async (req, res) => {
  // grab everyone from the db
  const all_drivers = await drivers.find({}).toArray()
  const all_givers = await givers.find({}).toArray()


  // check if we need to show a message
  const { status, message } = req.query;
  const notification = status && message ? { status, message } : null;
  res.render("index", { drivers: all_drivers, givers: all_givers, notification })
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

app.post('/join/giver', async (req, res) => {
  const data = req.body;
  const errors = validate_giver(data);

  if (errors.length > 0) {
    return res.status(400).json({ status: "error", message: errors.join('\n') });
  }

  try {
    const existing = await givers.findOne({ donorEmail: data.donorEmail.trim() });
    if (existing) {
      return res.status(409).json({ status: "error", message: "A donor is already registered with this email." });
    }

    const newGiver = {
      orgName: data.orgName.trim(),
      contactPerson: data.contactPerson.trim(),
      donorEmail: data.donorEmail.trim(),
      donorPhone: data.donorPhone.trim(),
      foodType: data.foodType.trim(),
      pickupTime: data.pickupTime.trim(),
      createdAt: new Date().toISOString()
    };

    await givers.insertOne(newGiver);

    return res.status(201).json({
      status: "success",
      message: `Thanks ${newGiver.contactPerson || newGiver.orgName}! We'll get in touch soon.`
    });

  } catch (err) {
    console.error("Error adding giver:", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong while saving your information. Please try again later."
    });
  }
});


app.post('/join/driver', async (req, res) => {
  const data = req.body;
  const errors = [];

  if (!data.volunteerName || data.volunteerName.trim().length < 2)
    errors.push("Full name is required and must be at least 2 characters.");
  if (!data.volunteerEmail || !/^[^@]+@[^@]+\.[^@]+$/.test(data.volunteerEmail))
    errors.push("A valid email address is required.");
  if (!data.volunteerPhone || !/^\+?\d{7,15}$/.test(data.volunteerPhone))
    errors.push("A valid phone number is required (7–15 digits).");
  if (!data.availability || data.availability.trim().length < 3)
    errors.push("Please select your availability.");

  if (errors.length > 0) {
    return res.status(400).json({ status: "error", message: errors.join('\n') });
  }

  try {
    const existing = await drivers.findOne({ volunteerEmail: data.volunteerEmail.trim() });
    if (existing) {
      return res.status(409).json({ status: "error", message: "A volunteer is already registered with this email." });
    }

    const newDriver = {
      volunteerName: data.volunteerName.trim(),
      volunteerEmail: data.volunteerEmail.trim(),
      volunteerPhone: data.volunteerPhone.trim(),
      availability: data.availability.trim(),
      createdAt: new Date().toISOString()
    };

    await drivers.insertOne(newDriver);

    return res.status(201).json({
      status: "success",
      message: `Thanks ${newDriver.volunteerName}! You’re now registered as a volunteer driver.`
    });

  } catch (err) {
    console.error("Error adding driver:", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong while saving your information. Please try again later."
    });
  }
});

app.listen(port, () => {
  console.log(`Kilometros de Vida running at port ${port}`)
})
