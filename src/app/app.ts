import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import UnsplashRoute from '../routes/unsplash';
import CountryRoute from '../routes/country';

const logStream: fs.WriteStream = fs.createWriteStream(
    path.join(__dirname, '../logs.log'),
    { flags: 'a' }
);
const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(morgan('combined', {stream: logStream}));

/**
 * IMPORTANT: Need to access the express server (with the corresponding port)
 * by Chrome to bypass the NET::ERR_CERT_AUTHORITY_INVALID
 */
app.use(
    cors({
        origin: process.env.ALLOWED_HOST,
    })
);
app.use(helmet());
/**
 * The compression may be useful later
 * This middleware will compress all assets before sending to the front
 */
app.use(compression());
app.use('/unsplash', UnsplashRoute);
app.use('/country', CountryRoute);

export default app;
