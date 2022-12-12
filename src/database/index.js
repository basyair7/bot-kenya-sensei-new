var admin = require("firebase-admin")
var serviceAccount = require("./firebaseKey/to/serviceAccount.json");
let https_db = require("./firebaseKey/https/index.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: https_db["https"]
  });

const db = admin.database();

module.exports = db;
