import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
    accessKey: '8PLfSge-7DWGe3cEk7QRMOGhIemmNZKLw3fkZY2hjDQ',
    fetch: nodeFetch
});

export default unsplash;
