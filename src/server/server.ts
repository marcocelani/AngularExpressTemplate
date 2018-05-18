import * as express from 'express';
import * as compression from 'compression';
import * as http from 'http';
import { Logger } from './Logger';
import { setTimeout } from 'timers';
import { Routing } from './routing';
import * as cors from 'cors';

class Server {
    private app: express.Application;
    private server: http.Server;
    private routing: Routing;

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
        this.routing = new Routing();
        this.configureExpressMiddleware();
        this.configureExpressRouting();
    }

    private manageSIGTERM(): void {
        Logger.logInfo(`Stopping ${process.env.APPNAME}...`);
        this.stop();
    }

    // you can set your routing parameters here.
    private configureExpressRouting(): void {
        this.app.get('/api/version', (req, res) => {
            this.routing.manage_version(req, res);
        });
    }
    // you can set your middleware here.
    private configureExpressMiddleware(): void {
        // enable CORS stuff only in a development
        // enviroment
        if (process.env.NODE_ENV === 'development') {
            Logger.logInfo(`enabling CORS...`);
            this.app.use(cors());
        }
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
