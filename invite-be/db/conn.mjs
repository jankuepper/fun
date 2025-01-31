import { MongoClient } from "mongodb";

const connectionString = "mongodb://user:pass@mongodb:27017";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("invites");

export default db;