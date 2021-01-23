import express from 'express';
import UnsplashRoute from '../routes/search';
import cors from 'cors';

const app = express();

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

// app.listen(3000);
export default app;
