import express from 'express';
import UnsplashRoute from './routes/unsplash/search';

const app = express();

app.use(UnsplashRoute);

// app.listen(3000);
export default app;
