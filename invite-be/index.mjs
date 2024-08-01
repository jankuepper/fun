import express from 'express'
import cors from 'cors'
import db from './db/conn.mjs'

const app = express()
const port = 3000
app.use(cors({
  origin: '*'
}))

app.get('/invites', async (req, res) => {
  let collection = await db.collection("invites")
  let results = await collection.find({}).toArray()
  res.send(results)
})

app.post('/invites', express.json(), async (req, res) => {
  let collection = await db.collection("invites")
  let results = await collection.insertOne(req.body)
  res.send(results)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})