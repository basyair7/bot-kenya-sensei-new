var admin = require("firebase-admin")
var serviceAccount = require("./kenya-sensei-firebase-adminsdk-ysdlc-5e6370f31d.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kenya-sensei-default-rtdb.firebaseio.com"
  });

const db = admin.database();

module.exports = db;
