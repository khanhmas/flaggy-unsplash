import express from 'express';
import UnsplashRoute from '../routes/search';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'https://172.17.207.46:8080'
}));
app.use(UnsplashRoute);

// app.listen(3000);
export default app;
