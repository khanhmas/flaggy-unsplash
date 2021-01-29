import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

// set <any> to bypass type error with unsplash api
const unsplash = createApi(<any>{
    accessKey: process.env.API_ACCESS_KEY,
    fetch: nodeFetch
});

export default unsplash;
