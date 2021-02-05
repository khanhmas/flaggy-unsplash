import https from 'https';
import fs from 'fs';
import app from './app/app';

const port: string = process.env.PORT || '3000';
let server;
if (process.env.NODE_ENV !== 'production') {
    const key: Buffer = fs.readFileSync(__dirname + '/../certs/server.key');
    const cert: Buffer = fs.readFileSync(
        __dirname + '/../certs/server.cert'
    );
    const options: Record<string, Buffer> = {
        key,
        cert,
    };

    server = https.createServer(options, app);
} else {
    server = app;
}

server.listen(port, () => {
    console.log('server starting on port: ' + port);
});
