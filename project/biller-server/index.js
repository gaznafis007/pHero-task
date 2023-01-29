const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Biller api is running");
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (error, decode) => {
    if (error) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decode = decode;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rayhh9x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const billsCollection = client.db("billers").collection("bills");

    app.get("/billings", verifyToken, async (req, res) => {
      const decode = req.decode;
      let query = {};
      //   if (decode.email !== req.query.email) {
      //     return res.status(403).send({ message: "forbidden access" });
      //   }
      if (req.query.email) {
        query = { userEmail: req.query.email };
      }
      const currentPage = parseInt(req.query.currentPage);
      const size = 10;
      const cursor = billsCollection.find(query);
      const result = await cursor
        .skip(currentPage * size)
        .limit(size)
        .toArray();
      const count = await billsCollection.estimatedDocumentCount();
      res.send({ count, result });
    });
    app.post("/billings", async (req, res) => {
      const bill = req.body;
      const result = await billsCollection.insertOne(bill);
      res.send(result);
    });
    app.delete("/billings/:_id", async (req, res) => {
      const id = req.params._id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await billsCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "7d",
      });
      res.send({ token });
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Biller is running on", port);
});
