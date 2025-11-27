import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const uri = process.env.ATLAS_URI;

if (!uri) {
    console.error("❌ ATLAS_URI is missing in .env");
    process.exit(1);
}

const client = new MongoClient(uri);

const sampleGivers = [
    {
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
        orgName: "Mercado de Abastos",
        contactPerson: "María González",
        donorEmail: "maria@abastos.com",
        donorPhone: "3312345678",
        foodType: "Frutas y verduras de temporada",
        pickupTime: "Martes y Jueves, 7am",
        address: "Av. Mandarina, Comercial Abastos, Guadalajara, Jal.",
        createdAt: new Date().toISOString()
    },
    {
        orgName: "Restaurante Casa Bariachi",
        contactPerson: "Carlos Ruiz",
        donorEmail: "carlos@bariachi.com",
        donorPhone: "3398765432",
        foodType: "Guidados y arroz",
        pickupTime: "Domingos, 10pm",
        address: "Av. Vallarta 2221, Arcos Vallarta, Guadalajara, Jal.",
        createdAt: new Date().toISOString()
    },
    {
        orgName: "Supermercado Fresko",
        contactPerson: "Ana López",
        donorEmail: "ana@fresko.com",
        donorPhone: "3311223344",
        foodType: "Lácteos y embutidos",
        pickupTime: "Lunes, 9am",
        address: "Av. Rafael Sanzio 150, La Estancia, Zapopan, Jal.",
        createdAt: new Date().toISOString()
    }
];

async function seed() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");

        const db = client.db("km-de-vida"); // Using the default db name from connection string usually, or specifying one
        // Note: The app uses process.env.DB_NAME or defaults. Let's check server.js.
        // server.js uses: db = client.db(process.env.DB_NAME);
        // But .env.template didn't have DB_NAME.
        // Let's assume the connection string has the db name or we use a default.
        // The connection string in template was .../kmdevida...

        // Let's try to parse it or just use 'test' or 'km-de-vida' if not specified.
        // Actually, let's look at server.js again to be sure.
        // server.js: db = client.db(process.env.DB_NAME);
        // If DB_NAME is not in .env, client.db(undefined) uses the one in URI.

        const givers = db.collection("givers");

        // Optional: Clear existing data
        // await givers.deleteMany({}); 

        const result = await givers.insertMany(sampleGivers);
        console.log(`✅ Inserted ${result.insertedCount} sample donors`);

    } catch (err) {
        console.error("❌ Seed failed:", err);
    } finally {
        await client.close();
    }
}

seed();
