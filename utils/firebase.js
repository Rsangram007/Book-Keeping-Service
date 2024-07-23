const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const serviceAccount = require('./serviceAccount.json');
//  const serviceAccount = require(process.env.SERVICE_ACCOUNT);

console.log(process.env.FIREBASE_PROJECT_ID)
console.log(process.env.SERVICE_ACCOUNT)

// console.log(serviceAccount)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
