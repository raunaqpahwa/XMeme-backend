const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const mongoose = require('mongoose');
const dbSettings = { useNewUrlParser: true,  useUnifiedTopology: true}
mongoose.connect(process.env.DATABASE_URL, dbSettings);

const db = mongoose.connection

db.on('error', () => console.error('Could not connect to the database'));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

const memesRouter = require('./routes/memes'); 

app.use('/memes', memesRouter);

app.listen(process.env.PORT || 8000, () => {
    console.log('Listening on server');
});