const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.4wbpkmt.mongodb.net/SolarsystemDB`;
mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Connection Successful");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});

const planetModel = mongoose.model('planets', dataSchema);

// POST endpoint to fetch a planet by ID
app.post('/planet', (req, res) => {
    planetModel.findOne({ id: req.body.id })
        .then((planetData) => {
            if (!planetData) {
                res.status(404).send({ error: "Planet not found. Please select a number from 0 to 9." });
            } else {
                res.send(planetData);
            }
        })
        .catch((err) => {
            console.error("Error fetching planet data:", err);
            res.status(500).send({ error: "Internal server error" });
        });
});

// Root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'))
        .catch((err) => {
            console.error("Error serving index.html:", err);
            res.status(500).send({ error: "Failed to load the page" });
        });
});

// OS endpoint
app.get('/os', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV
    });
});

// Health check endpoints
app.get('/live', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "live"
    });
});

app.get('/ready', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "ready"
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server successfully running on port - 3000");
});

module.exports = app;
