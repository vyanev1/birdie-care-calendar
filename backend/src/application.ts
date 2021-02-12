import * as express from "express";
import * as cors from 'cors';

import { pingController } from "./controllers/ping";
import { eventController } from "./controllers/event";
import { recipientController } from "./controllers/recipient";
import { caregiversController } from "./controllers/caregivers";

require('dotenv').config();

const app = express();

app.use(cors());
app.use(pingController);
app.use(eventController);
app.use(recipientController);
app.use(caregiversController);
app.use(express.static(__dirname + '/../../front-end/public'));

app.get('/', (_req, res) => {
    res.send('Server started');
});

export default app;
