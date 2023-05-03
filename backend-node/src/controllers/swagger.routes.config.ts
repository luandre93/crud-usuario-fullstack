import { CommonRoutesConfig } from '../common/common.routes.config';
import VERSION_API from '../common/version.config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "../swagger.json";


export class SwaggerRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'SwaggerRoutes');
    }
    configureRoutes() {
        this.app.use(`/${VERSION_API}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
        return this.app;
    }
}