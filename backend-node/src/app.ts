import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import bodyParser from "body-parser";
import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './controllers/users.routes.config';
import { ConsoleLine } from './util/console.msg';
import { RulesRoutes } from './controllers/rules.routes.config';
import { SwaggerRoutes } from './controllers/swagger.routes.config';
import VERSION_API from './common/version.config';
const app: express.Application = express();
const debugLog: debug.IDebugger = debug('app');
const server: http.Server = http.createServer(app);
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

const routes: Array<CommonRoutesConfig> = [
    new UsersRoutes(app),
    new RulesRoutes(app),
    new SwaggerRoutes(app)
];
const lineConsole = new ConsoleLine();
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

const runningMessage: string = `Servidor: http://localhost:${port}.`;

app.get('/', (req: express.Request, res: express.Response) => {
    res.redirect(`/${VERSION_API}/api-docs/`)
});

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    lineConsole.frontLn(runningMessage)
});