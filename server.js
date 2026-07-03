const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.MONGODB_URI);

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(
  cors({
    origin: "https://phishing-email-detector-frontend.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {

    res.send("PhishGuard Backend Running");

});

// Routes
app.use("/api/analyze", require("./routes/analyzerRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});