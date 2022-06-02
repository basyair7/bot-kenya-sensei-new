var admin = require("firebase-admin")
var serviceAccount = require("./kenya-sensei-firebase-adminsdk-ysdlc-6ff2b5d50f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kenya-sensei-default-rtdb.firebaseio.com"
  });

const db = admin.database();

module.exports = db;
