import * as express from 'express';
import { ResponseModel } from '../shared/models/response.model';

// routing implementation
export class Routing {
    constructor() { }

    manage_version(req: express.Request, res: express.Response) {
        this.sendJSONResponse(res, { status: true, message: `${process.env.APPNAME}:${process.env.VERSION}` });
    }

    private sendJSONResponse(res: express.Response, data: ResponseModel) {
        res.status(200).type('json').end(JSON.stringify(data));
    }
}
