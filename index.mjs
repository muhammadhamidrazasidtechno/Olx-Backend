import express from 'express';
import router from './Router/index.mjs';
import db from "./config/db.mjs";
import cors from 'cors'; // CORS middleware ko import karein

const app = express();

console.log("hello");
app.use(cors());
app.use(express.json());

// CORS middleware ka use karein

app.use('/', router);

db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err));

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server connected to localhost on port ${PORT}!`);
});
