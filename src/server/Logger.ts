import { DateTime } from 'luxon';

export class Logger {
    private static log(type: string, mex: string): void {
        (type === 'ERR')
            ? console.error(`[${process.pid}][${DateTime.local().toLocaleString()}][${type}] ${mex}`)
            : console.log(`[${process.pid}][${DateTime.local().toLocaleString()}][${type}] ${mex}`);
    }

    public static logErr(mex: string) {
        this.log('ERR', mex);
    }

    public static logInfo(mex: string): void {
        this.log('INFO', mex);
    }
}
