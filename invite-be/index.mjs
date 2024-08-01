import express from "express";
import cors from "cors";
import db from "./db/conn.mjs";
import { createServer } from "node:https";

const key = fs.readFileSync("./certs/privkey.pem");
const cert = fs.readFileSync("./certs/cert.pem");

const app = express();
const port = 3000;
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.get("/invites", async (req, res) => {
  let collection = await db.collection("invites");
  let results = await collection.find({}).toArray();
  res.send(results);
});

app.post("/invites", express.json(), async (req, res) => {
  let collection = await db.collection("invites");
  let results = await collection.insertOne(req.body);
  res.send(results);
});

https.createServer({ key, cert }, app).listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
