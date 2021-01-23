import https from 'https';
import fs from 'fs';
import app from './app/app';

const port: number = 3000;
const key: Buffer = fs.readFileSync(__dirname + '/../../certs/server.key');
const cert: Buffer = fs.readFileSync(__dirname + '/../../certs/server.cert');
const options: Record<string, Buffer> = {
    key,
    cert,
};

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log('server starting on port : ' + port);
});
