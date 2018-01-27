import * as express from 'express';
import * as compression from 'compression';
import * as http from 'http';
import { Logger } from './Logger';
import { setTimeout } from 'timers';

class Server {
    private app: express.Application;
    private server: http.Server;

    constructor() {
        process.on('SIGINT', () => {
            if (process.env.PROD === true) {
                return;
            }
            this.manageSIGTERM();
        });

        process.on('SIGTERM', () => {
            this.manageSIGTERM();
        });

        process.on('exit', () => {
            Logger.logInfo(`bye...`);
        });

        this.app = express();
        this.configureExpressMiddleware();
        this.configureExpressRouting();
    }

    private manageSIGTERM(): void {
        Logger.logInfo(`Stopping ${process.env.APPNAME}...`);
        this.stop();
    }

    private configureExpressRouting(): void {
    }

    private configureExpressMiddleware(): void {
        this.app.use(compression());
        this.app.use(express.static('dist/client'));
    }

    start() {
        Logger.logInfo(`Starting ${process.env.APPNAME}`);
        this.server = this.app.listen(process.env.PORT,
            () => { Logger.logInfo(`${process.env.APPNAME} listening on port ${process.env.PORT}`); });
        this.server.on('close', () => { Logger.logInfo(`Server stopped.`); });
    }

    stop() {
        if (this.server) {
            this.server.close();
        }
        setTimeout(() => {
            Logger.logInfo(`exiting...`);
            process.exit(0);
        }, 1000);
    }
}
new Server().start();
