import express from 'express'
import { dirname, join } from 'path'
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

// this is because mongo hangs the connection if we do not close it manually
// so on ctrl + c it stops for good
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
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

app.get('/',async (req, res) => {
  // get all the drivers and givers
  const all_drivers = await drivers.find({}).toArray()
  const all_givers = await givers.find({}).toArray()


  // notification if some
  const { status, message } = req.query;
  const notification = status && message ? { status, message } : null;
  res.render("index", {drivers: all_drivers, givers: all_givers, notification})
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
  const notification = { status: "", message: "" };

  // --- Validation errors ---
  if (errors.length > 0) {
    notification.status = "error";
    notification.message = errors.join('\n');
    return res.redirect(`/?status=${encodeURIComponent(notification.status)}&message=${encodeURIComponent(notification.message)}`);
  }

  try {
    // --- Check for duplicates ---
    const existing = await givers.findOne({ donorEmail: data.donorEmail.trim() });
    if (existing) {
      notification.status = "error";
      notification.message = "A donor is already registered with this email.";
      return res.redirect(`/?status=${encodeURIComponent(notification.status)}&message=${encodeURIComponent(notification.message)}`);
    }

    // --- Prepare new giver document ---
    const newGiver = {
      orgName: data.orgName.trim(),
      contactPerson: data.contactPerson.trim(),
      donorEmail: data.donorEmail.trim(),
      donorPhone: data.donorPhone.trim(),
      foodType: data.foodType.trim(),
      pickupTime: data.pickupTime.trim(),
      createdAt: new Date().toISOString()
    };

    // --- Insert into MongoDB ---
    await givers.insertOne(newGiver);

    notification.status = "success";
    notification.message = `Thanks ${newGiver.contactPerson || newGiver.orgName}! We'll get in touch soon.`;

    return res.redirect(`/?status=${encodeURIComponent(notification.status)}&message=${encodeURIComponent(notification.message)}`);

  } catch (err) {
    console.error("Error adding giver:", err);
    notification.status = "error";
    notification.message = "Something went wrong while saving your information. Please try again later.";
    return res.redirect(`/?status=${encodeURIComponent(notification.status)}&message=${encodeURIComponent(notification.message)}`);
  } });


app.post('/join/driver', async (req, res) => {
  const data = req.body;
  const notification = { status: "", message: "" };
  const errors = [];

  
  if (!data.volunteerName || data.volunteerName.trim().length < 2)
    errors.push("Full name is required and must be at least 2 characters.");
  if (!data.volunteerEmail || !/^[^@]+@[^@]+\.[^@]+$/.test(data.volunteerEmail))
    errors.push("A valid email address is required.");
  if (!data.volunteerPhone || !/^\+?\d{7,15}$/.test(data.volunteerPhone))
    errors.push("A valid phone number is required (7–15 digits).");
  if (!data.availability || data.availability.trim().length < 3)
    errors.push("Please select your availability.");
  

  // --- Handle validation errors ---
  if (errors.length > 0) {
    notification.status = "error";
    notification.message = errors.join('\n');
    return res.redirect(`/?status=${encodeURIComponent(notification.status)}&message=${encodeURIComponent(notification.message)}`);
  }

  try {
    // --- Check duplicates ---
    const existing = await drivers.findOne({ volunteerEmail: data.volunteerEmail.trim() });
    if (existing) {
      notification.status = "error";
      notification.message = "A volunteer is already registered with this email.";
      return res.redirect(`/?status=${encodeURIComponent(notification.status)}&message=${encodeURIComponent(notification.message)}`);
    }

    // --- Insert new driver ---
    const newDriver = {
      volunteerName: data.volunteerName.trim(),
      volunteerEmail: data.volunteerEmail.trim(),
      volunteerPhone: data.volunteerPhone.trim(),
      availability: data.availability.trim(),
      createdAt: new Date().toISOString()
    };

    await drivers.insertOne(newDriver);

    notification.status = "success";
    notification.message = `Thanks ${newDriver.volunteerName}! You’re now registered as a volunteer driver.`;

    return res.redirect(`/?status=${encodeURIComponent(notification.status)}&message=${encodeURIComponent(notification.message)}`);

  } catch (err) {
    console.error("Error adding driver:", err);
    notification.status = "error";
    notification.message = "Something went wrong while saving your information. Please try again later.";
    return res.redirect(`/?status=${encodeURIComponent(notification.status)}&message=${encodeURIComponent(notification.message)}`);
  } });

app.listen(port, () => {
  console.log(`Kilometros de Vida running at port ${port}`)
})
