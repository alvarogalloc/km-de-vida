import express from 'express'
import { config } from 'dotenv'
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb"
import bodyParser from 'body-parser'
import { OAuth2Client } from 'google-auth-library'
import cors from 'cors'

config();

const app = express()
const port = process.env.PORT || 5050
const db_uri = process.env.ATLAS_URI || '' // make sure to set this in .env!!
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


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
let users;
let useMockData = false;

// Mock data for demo purposes
const mockDrivers = [];
const mockGivers = [
  {
    _id: "1",
    orgName: "Panadería La Esperanza",
    contactPerson: "Juan Pérez",
    donorEmail: "juan@esperanza.com",
    donorPhone: "5512345678",
    foodType: "Pan dulce y bolillos del día",
    pickupTime: "Lunes a Viernes, 8pm",
    address: "Av. Vallarta 2440, Arcos Vallarta, Guadalajara, Jal.",
    createdAt: new Date().toISOString()
  },
  {
    _id: "2",
    orgName: "Mercado de Abastos",
    contactPerson: "María González",
    donorEmail: "maria@abastos.com",
    donorPhone: "3312345678",
    foodType: "Frutas y verduras de temporada",
    pickupTime: "Martes y Jueves, 7am",
    address: "Av. Mandarina, Comercial Abastos, Guadalajara, Jal.",
    createdAt: new Date().toISOString()
  }
];
const mockUsers = [];

async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    drivers = db.collection("drivers");
    givers = db.collection("givers");
    users = db.collection("users");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.warn(" MongoDB connection failed"+err+", using MOCK DATA for demo");
    console.warn("   To use real database, update ATLAS_URI in .env file");
    useMockData = true;
    // Don't exit, continue with mock data
  }
}

// mongo keeps running if we don't stop it here
// so when we press ctrl+c it actually quits
process.on('SIGINT', async () => {
  if (!useMockData) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

await connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Add JSON body parser
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes


// here are the api endpoints
// simple get for data
app.get('/api/data', async (req, res) => {
  try {
    if (useMockData) {
      res.json({ drivers: mockDrivers, givers: mockGivers });
    } else {
      const all_drivers = await drivers.find({}).toArray();
      const all_givers = await givers.find({}).toArray();
      res.json({ drivers: all_drivers, givers: all_givers });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  if (useMockData) {
    // In mock mode, create a fake user
    const mockUser = {
      _id: "mock-user-1",
      email: "demo@kmdevida.com",
      name: "Demo User",
      picture: "https://via.placeholder.com/150",
      lastLogin: new Date()
    };
    return res.status(200).json({ user: mockUser, message: 'Login successful (DEMO MODE)' });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    const user = await users.findOneAndUpdate(
      { email },
      { $set: { name, picture, lastLogin: new Date() } },
      { upsert: true, returnDocument: 'after' }
    );

    res.status(200).json({ user, message: 'Login successful' });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});



// helper to validate giver data
// returns array of error strings
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

  if (!data.address || data.address.trim().length < 5)
    errors.push("Address is required.");
  return errors;
}

app.post('/join/giver', async (req, res) => {
  const data = req.body;
  const errors = validate_giver(data);

  if (errors.length > 0) {
    return res.status(400).json({ status: "error", message: errors.join('\n') });
  }

  try {
    // const existing = await givers.findOne({ donorEmail: data.donorEmail.trim() });
    // if (existing) {
    //   return res.status(409).json({ status: "error", message: "A donor is already registered with this email." });
    // }

    const newGiver = {
      orgName: data.orgName.trim(),
      contactPerson: data.contactPerson.trim(),
      donorEmail: data.donorEmail.trim(),
      donorPhone: data.donorPhone.trim(),
      foodType: data.foodType.trim(),
      pickupTime: data.pickupTime.trim(),
      address: data.address.trim(),
      userId: data.userId || null, // Link to user if logged in
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
      userId: data.userId || null, // Link to user if logged in
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

// --- Capstone CRUD Endpoints ---

// Get donations for a specific user (by email or userId)
app.get('/api/my-donations', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const myGivers = await givers.find({ donorEmail: email }).toArray();
    res.json(myGivers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

// Get volunteer shifts for a specific user
app.get('/api/my-volunteer-shifts', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const myShifts = await drivers.find({ volunteerEmail: email }).toArray();
    res.json(myShifts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch volunteer shifts" });
  }
});

// Delete a donation
app.delete('/api/donations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await givers.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.json({ message: "Donation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete donation" });
  }
});

// Update a donation
app.put('/api/donations/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  // Basic validation (can reuse validate_giver if needed, but might be partial update)
  if (!data.orgName || !data.foodType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await givers.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          orgName: data.orgName,
          contactPerson: data.contactPerson,
          donorPhone: data.donorPhone,
          foodType: data.foodType,
          pickupTime: data.pickupTime,
          address: data.address
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.json({ message: "Donation updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update donation" });
  }
});

// Assign volunteer to a specific donation shift
app.post('/api/shifts/assign', async (req, res) => {
  const { donationId, volunteerEmail, volunteerName } = req.body;

  if (!donationId || !volunteerEmail || !volunteerName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if donation exists
    const donation = await givers.findOne({ _id: new ObjectId(donationId) });
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    // Check if volunteer is already assigned to this donation
    const volunteers = donation.assignedVolunteers || [];
    const alreadyAssigned = volunteers.some(v => v.email === volunteerEmail);

    if (alreadyAssigned) {
      return res.status(409).json({ error: "Ya estás asignado a este turno" });
    }

    // Add volunteer to the donation's assignedVolunteers array
    await givers.updateOne(
      { _id: new ObjectId(donationId) },
      {
        $push: {
          assignedVolunteers: {
            email: volunteerEmail,
            name: volunteerName,
            assignedAt: new Date().toISOString()
          }
        }
      }
    );

    res.status(200).json({ message: "Turno asignado exitosamente" });
  } catch (error) {
    console.error("Error assigning shift:", error);
    res.status(500).json({ error: "Failed to assign shift" });
  }
});

// Unassign volunteer from a donation shift
app.delete('/api/shifts/unassign/:donationId', async (req, res) => {
  const { donationId } = req.params;
  const { volunteerEmail } = req.body;

  if (!volunteerEmail) {
    return res.status(400).json({ error: "Volunteer email required" });
  }

  try {
    await givers.updateOne(
      { _id: new ObjectId(donationId) },
      {
        $pull: {
          assignedVolunteers: { email: volunteerEmail }
        }
      }
    );

    res.status(200).json({ message: "Turno desasignado exitosamente" });
  } catch (error) {
    console.error("Error unassigning shift:", error);
    res.status(500).json({ error: "Failed to unassign shift" });
  }
});

// Get volunteer's assigned shifts
app.get('/api/my-assigned-shifts', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    // Find all donations where this volunteer is assigned
    const assignedShifts = await givers.find({
      'assignedVolunteers.email': email
    }).toArray();

    res.json(assignedShifts);
  } catch (error) {
    console.error("Error fetching assigned shifts:", error);
    res.status(500).json({ error: "Failed to fetch assigned shifts" });
  }
});

app.listen(port, () => {
  console.log(`Kilometros de Vida running at port ${port}`)
})
