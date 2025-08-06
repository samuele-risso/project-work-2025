import express from 'express';
import { Request, Response } from 'express';
var cors = require('cors')

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors({
  origin: process.env.CLIENT_BASE_URL
}));

app.use(express.json()); 

app.get('/');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});