// TODO: MongoDB Connection Setup
// 
// The application currently cannot connect to MongoDB Atlas due to invalid credentials.
// 
// Steps to fix:
// 1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
// 2. Create a free cluster
// 3. Create a database user with username and password
// 4. Whitelist your IP address in Network Access
// 5. Get the connection string from the "Connect" button
// 6. Update the .env file in the root directory:
//    ATLAS_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
//    DB_NAME=km-de-vida
//    PORT=5050
//    GOOGLE_CLIENT_ID=<your-google-client-id>
// 7. Update client/.env file:
//    VITE_GOOGLE_CLIENT_ID=<your-google-client-id>
// 8. Run `node seed.js` to populate the database with sample data
// 9. Restart both servers (npm run dev in root and client directories)
//
// Once connected, the map will display donor locations and all features will work.
