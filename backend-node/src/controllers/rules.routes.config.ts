import { postRules, getAllRules, getRules } from "../database/dal/rules.dal";
import { CommonRoutesConfig } from '../common/common.routes.config';
import { IUserSession } from '@/interfaces/rules.interface'
import VERSION_API from "../common/version.config";
import express from 'express';

export class RulesRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'RulesRoutes');
    }

    configureRoutes() {
        this.app.route(`/${VERSION_API}/rules`)
            .get(async (req: express.Request, res: express.Response): Promise<any> => {
                try {
                    res.status(200).send(await getAllRules());
                } catch (err: any) {
                    res.status(500).send({ error: 'Error interno no servidor' });
                }
            })

        this.app.route(`/${VERSION_API}/rule`)
            .post(async (req: express.Request, res: express.Response): Promise<any> => {
                try {
                    const userSessions: IUserSession = req.body.user_sessions;
                    const result: string = await postRules(userSessions)
                    res.status(200).send(result)
                } catch (err: any) {
                    res.status(500).send({ error: 'Error interno no servidor' });
                }
            })

        this.app.route(`/${VERSION_API}/rules:usersessions`)
            .get(async (req: express.Request, res: express.Response): Promise<any> => {
                try {
                    const userSessions: string = req.query.username as unknown as string;
                    res.status(200).send(await getRules(userSessions));
                } catch (err: any) {
                    res.status(500).send({ error: 'Error interno no servidor' });
                }
            })

        return this.app
    }
}