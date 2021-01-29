import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
    accessKey: process.env.API_ACCESS_KEY,
    fetch: nodeFetch
});

export default unsplash;
