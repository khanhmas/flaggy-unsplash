import express from 'express';
import UnsplashRoute from '../routes/search';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

/**
 * IMPORTANT: Need to access the express server (with the corresponding port)
 * by Chrome to bypass the NET::ERR_CERT_AUTHORITY_INVALID
 */
app.use(
    cors({
        origin: 'https://localhost:8080',
    })
);
app.use('/unsplash', UnsplashRoute);

export default app;
