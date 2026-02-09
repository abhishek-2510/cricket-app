const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error:", err));

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  role: { type: String, required: true },
  city: { type: String, required: true }
});

const Player = mongoose.model("Player", PlayerSchema);

app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, age, role, city } = req.body;

    if (!name || !email || !phone || !age || !role || !city) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existing = await Player.findOne({
      $or: [{ email }, { phone }]
    });

    if (existing) {
      return res.status(400).json({ message: "User already registered with this email or phone" });
    }

    const player = new Player({ name, email, phone, age, role, city });
    await player.save();

    res.json({ message: "Registration successful" });

  } catch (err) {
    console.log("Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/players", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on port 5000");
});
